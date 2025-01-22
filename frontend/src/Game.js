import * as THREE from "three";
import { dijkstra, getSteps } from "./utils/game_utils";
import Castle from "./entities/Castle";
import Portal from "./entities/Portal";
import KeyboardInput from "./components/KeyboardInput";
import MouseInput from "./components/MouseInput";
import { levels } from "./levels";
import { Status as TowerStatus } from "./entities/towers/Tower";
import { BUFFED } from "./entities/towers/BuffTower";
import { statusFunctions } from "./entities/statuses";

export const [BUILD, DEFEND, SCORE] = ['build', 'defend', 'score'];

export default class Game {
    constructor(gameMap) {
        this.level = 1;
        this.phase = BUILD;
        this.over = false;

        this.gameMap = gameMap;
        this.gameMapOverrides = new Map();

        this.towers = new Array(gameMap.width).fill(null).map(() => new Array(gameMap.depth).fill(null));
        this.portal = new Portal(0, 0, gameMap.getElevation(0, 0));
        this.castle = new Castle(
            gameMap.width - 1,
            gameMap.depth - 1,
            gameMap.getElevation(gameMap.width - 1, gameMap.depth - 1)
        );  // Assumes map is rectangular
        this.towers[0][0] = this.portal;
        this.towers[gameMap.width - 1][gameMap.depth - 1] = this.castle;

        this.enemies = [];
        this.enemyInfo = {};
        this.spawningEnemies = false;
        this.projectiles = [];

        this.animationFunctions = [];
        this.spawnFunction = () => null;
        this.path = [];
        this.steps = [];
        this.gold = 500;
        this.goldReward = 0;

        this.keyboardInput = new KeyboardInput();
        this.mouseInput = new MouseInput();
        this.setPath(this.portal.position, this.castle.position);

        this.cameraTarget = null;
        this.resetCameraTarget();
        this.configureCameraControls();
    }

    resetCameraTarget = () => {
        this.cameraTarget = new THREE.Vector3(this.gameMap.width / 2 - .5, 0, this.gameMap.depth / 2 - .5);
    }

    configureCameraControls = () => {
        const name = "CameraController";
        this.keyboardInput.addKeyDownCallback('c', name, () => {
            this.resetCameraTarget();
        });
    }

    setPath = () => {
        this.path = dijkstra(this.gameMap, this.portal.position, this.castle.position);
    }

    setSteps = (speed = 1) => {
        this.setPath();
        this.steps = getSteps(this.path, this.gameMap, speed);
    }

    spawnEnemy = (enemy) => {
        const newEnemy = new enemy(...this.steps[0]);
        this.enemies.push(newEnemy);
        this.animationFunctions.push(newEnemy.getMoveFunction(this.steps));
    }

    setupEnemySpawn = (level) => {
        let { enemy, count, delay } = level;
        this.enemyInfo = { enemy, count, delay, remaining: count };
        let currentDelay = 0;
        this.spawningEnemies = true;
        this.spawnFunction = () => {
            if (currentDelay) {
                currentDelay--;
            } else {
                if (count) {
                    this.spawnEnemy(enemy);
                    count--;
                    this.enemyInfo.remaining--;
                } else {
                    this.spawnFunction = () => null;
                    this.spawningEnemies = false;
                }
                currentDelay = delay;
            }
        }
    }

    addProjectile = (projectile) => {
        if (!projectile) return;
        this.projectiles.push(projectile);
        this.animationFunctions.push(projectile.getMoveFunction());
    }

    addTower = (tower) => {
        const [x, y, _] = tower.position;
        this.towers[x][y] = tower;
    }

    removeTower = (x, y) => {
        this.towers[x][y] = null;
    }

    tick = () => {
        for (let fn of this.animationFunctions) fn();
        this.spawnFunction();

        this.handleEnemyStatus();
        this.handleEnemiesAtCastle();
        this.towersAttack();
        this.checkLevelOver();
    }

    handleEnemyStatus = () => {
        for (let enemy of this.enemies) {
            for (let [status, hasStatus] of Object.entries(enemy.statuses)) {
                if (hasStatus) statusFunctions[status](enemy);
            }
        }
    }

    startDefendPhase = () => {
        if (this.phase !== BUILD || this.over) return;
        this.phase = DEFEND;

        this.spawningEnemies = true;
        this.enemies = [];
        this.projectiles = [];

        this.commitTowers();
        this.applyBuffs();

        const level = levels[this.level];
        this.setSteps(level.enemy.SPEED);
        this.setupEnemySpawn(level);
        this.goldReward = level.gold;
    }

    commitTowers = () => {
        for (let tower of this.towers.flat()) {
            if (tower && "status" in tower) {
                // TODO: Remove portal and castle from towers array
                tower.status = TowerStatus.BUILT;
            }
        }
    }

    towersAttack = () => {
        for (let tower of this.towers.flat()) {
            // handle null, portal, and castle
            if (!tower || !tower.getProjectilePath || !tower.createProjectile) continue;

            // handle tower cooldown
            if (tower.currentCooldown) {
                --tower.currentCooldown;
                continue;
            }

            // check all enemies, attack first (farthest along path)
            let towerAttacked = false;
            for (let enemy of this.enemies) {
                if (!enemy.hp) continue;
                const path = tower.getProjectilePath(enemy.position, this.gameMap);

                if (path.length) {
                    if (!towerAttacked) { // prevent stacked projectiles hitting same tile
                        if (tower.appliedStatus) {
                            if (enemy.statuses[tower.appliedStatus]) {
                                continue;
                            }
                            enemy.statuses[tower.appliedStatus] = true;
                        }
                        // TODO: this is instant damage, convert to when projectile hits?
                        const damage = tower.buffs[BUFFED] ? tower.damage * 2 : tower.damage;
                        enemy.hp = Math.max(enemy.hp - damage, 0);

                        const projectile = tower.createProjectile(path);
                        this.addProjectile(projectile);
                    }

                    towerAttacked = true;
                    if (!tower.canAttackMultiple) break;
                }
            }
            if (towerAttacked) tower.currentCooldown = tower.cooldown;
        }
    }

    handleEnemiesAtCastle = () => {
        for (const enemy of this.enemies) {
            if (
                enemy.position[0] === this.castle.position[0] &&
                enemy.position[1] === this.castle.position[1] &&
                enemy.position[2] === this.castle.position[2] &&
                enemy.hp // enemy is alive at castle
            ) {
                this.castle.takeDamage(enemy.hp);
                if (this.castle.hp <= 0) this.over = true;
                enemy.hp = 0;
            }
        }
    }

    checkLevelOver = () => {
        if (
            this.phase === DEFEND &&
            !this.spawningEnemies &&
            !this.enemies.some(enemy => !!enemy.hp)
        ) {
            this.enemies = [];
            this.enemyInfo = {};
            this.projectiles = [];
            this.gold += this.goldReward;
            this.level++;

            if (this.level == levels.length - 1) {
                this.over = true;
                return
            }

            // TODO: implement score phase
            this.phase = SCORE;
            setTimeout(() => this.phase = BUILD, 2000);
        }
    }

    applyBuffs = () => {
        for (const tower of this.towers.flat().filter(tower => !!tower)) {
            tower.buffs = {};
        }
        for (const buffTower of this.towers.flat().filter(t => t?.name === 'buffTower')) {
            for (const otherTower of this.towers.flat().filter(t => t && t.name !== 'buffTower')) {
                if (buffTower.canHit(otherTower.position, this.gameMap)) {
                    otherTower.buffs[BUFFED] = true;
                }
            }
        }
    }
}



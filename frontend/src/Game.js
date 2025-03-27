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
import UndoManager, { ActionType, GameAction } from "./utils/UndoManager";
import { TERRAFORMS } from "./entities/buildables";
import GUI from 'lil-gui';
import GameMap from "./map/GameMap";

export const [BUILD, DEFEND, SCORE, WIN, LOSE] = ['build', 'defend', 'score', 'win', 'lose'];

export default class Game {
    constructor(gameMap) {
        this.level = 1;
        this.phase = BUILD;
        this.over = false;

        this.gameMap = gameMap;
        this.gameMapOverrides = new Map();
        this.undoManager = new UndoManager(this, gameMap);

        this.towerLimit = 5;
        this.enableTowerLimits = false;
        this.blueprints = new Set(['arrowTower']);
        this.enableBlueprints = false;

        this.portal = new Portal(0, 0, gameMap.getElevation(0, 0));
        this.castle = new Castle(
            gameMap.width - 1,
            gameMap.depth - 1,
            gameMap.getElevation(gameMap.width - 1, gameMap.depth - 1)
        );  // Assumes map is rectangular
        gameMap.addTower(0, 0, this.portal);
        gameMap.addTower(gameMap.width - 1, gameMap.depth - 1, this.castle);

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

        this.devGui = new GUI({ title: "Debug Menu" });
        this.phaseListeners = {
            [BUILD]: [],
            [DEFEND]: [
                this.commitTowers,
                this.applyBuffs,
                this.runUpkeepFunctions,
                this.handleLevelChange,
                this.undoManager.clear,
            ],
            [SCORE]: [],
            [WIN]: [],
            [LOSE]: [],
        }

        this.damage_dealt = 0
        this.damage_taken = 0
    }

    addPhaseListener = (phase, fn) => {
        this.phaseListeners[phase].push(fn);
    }

    removePhaseListener = (phase, fn) => {
        this.phaseListeners[phase] = this.phaseListeners[phase].filter(f => f !== fn);
    }

    setPhase = (phase) => {
        this.phase = phase;
        for (const fn of this.phaseListeners[phase]) {
            fn();
        }
    }

    getAllTowers = () => {
        return Array.from(this.gameMap.towers.values().filter(t => !!t));
    }

    getTower = (x, y) => this.gameMap.getTower(x, y)

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
        this.spawningEnemies = true;
        this.enemies = [];
        this.projectiles = [];

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

    addTower = (tower, canUndo = true) => {
        const [x, y, z] = tower.position;
        this.gameMap.addTower(x, y, tower);

        if (canUndo) {
            this.undoManager.push(new GameAction(x, y, z, ActionType.BUILD, tower.price, tower.name));
        }
    }

    removeTower = (x, y, canUndo = true) => {
        if (canUndo) {
            const removed = this.gameMap.getTower(x, y)
            this.undoManager.push(new GameAction(...removed.position, ActionType.SELL, -removed.price / 2, removed.name));
        }
        this.gameMap.removeTower(x, y);
    }

    addTile(tile, canUndo = true) {
        this.gameMap.addTile(tile, canUndo);
        if (this.undoManager && canUndo) {
            const { x, y, z, type } = tile;
            this.undoManager.push(new GameAction(
                x, y, z, ActionType.FILL,
                TERRAFORMS.get(ActionType.FILL).price,
                null, type
            ));
        }
    }

    removeTile(x, y, z, canUndo = true) {
        if (canUndo) {
            this.undoManager.push(new GameAction(
                x, y, z, ActionType.DIG,
                TERRAFORMS.get(ActionType.DIG).price,
                null, this.gameMap.getTile(x, y, z).type
            ));
        }
        this.gameMap.removeTile(x, y, z);
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
            for (let status of enemy.statuses) {
                statusFunctions[status](enemy);
            }
        }
    }

    handleLevelChange = () => {
        const level = levels[this.level];
        this.setSteps(level.enemy.SPEED);
        this.setupEnemySpawn(level);
        this.goldReward = level.gold;
    }

    commitTowers = () => {
        for (const tower of this.getAllTowers()) {
            if (tower.status === TowerStatus.PENDING) {
                tower.status = TowerStatus.BUILT;
            }
        }
    }

    towersAttack = () => {
        for (const tower of this.getAllTowers()) {
            // handle portal, and castle
            if (!tower.getProjectilePath || !tower.createProjectile) continue;

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
                            if (enemy.statuses.has(tower.appliedStatus)) {
                                continue;
                            }
                            enemy.statuses.add(tower.appliedStatus);
                        }
                        // TODO: this is instant damage, convert to when projectile hits?
                        if (tower.damage) {
                            const damage = tower.buffs.has(BUFFED) ? tower.damage * 2 : tower.damage;
                            this.damage_dealt += Math.min(enemy.hp, damage)
                            enemy.hp = Math.max(enemy.hp - damage, 0);
                        }

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
                this.damage_taken += Math.min(this.castle.hp, enemy.hp)
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
            this.level++;

            if (this.level == levels.length - 1) {
                this.over = true;
                return
            }

            if (!this.castle.hp) {
                this.setPhase(LOSE)
                return
            }

            if (this.level >= levels.length) {
                this.setPhase(WIN)
                return
            }

            this.setPhase(SCORE);
        }
    }

    applyBuffs = () => {
        for (const tower of this.getAllTowers()) {
            tower.buffs.clear();
        }
        for (const buffTower of this.getAllTowers().filter(t => t?.name === 'buffTower')) {
            for (const otherTower of this.getAllTowers().filter(t => t.name !== 'buffTower')) {
                if (buffTower.canHit(otherTower.position, this.gameMap)) {
                    otherTower.buffs.add(BUFFED);
                }
            }
        }
    }

    // tower functions that run once at the beginning of the defend phase
    runUpkeepFunctions = () => {
        for (const tower of this.getAllTowers()) {
            if (tower.upkeep) {
                tower.upkeep(this);
            }
        }
    }

    getTowerCount = () => {
        return this.getAllTowers().length - 2; // subtract two for portal and castle
    }

    toJSON = () => {
        return {
            gameMap: this.gameMap.toJSON(),
            level: this.level,
            gold: this.gold,
            castleHP: this.castle.hp,
        }
    }

    static from(hashedString) {
        try {
            const decodedString = atob(hashedString);
            const json = JSON.parse(decodedString);
            const { gameMap, level, gold, castleHP } = json;

            if (!gameMap || !level || gold === null || !castleHP) {
                throw new Error('Invalid game data');
            }

            const newGame = new Game(GameMap.from(gameMap));
            newGame.level = level;
            newGame.gold = gold;
            newGame.castle.hp = castleHP;

            return newGame;
        } catch (error) {
            console.error(error);
            return null;
        }
    }
}



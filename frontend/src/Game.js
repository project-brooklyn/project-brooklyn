import { dijkstra, getSteps } from "./utils/game_utils";
import Castle from "./entities/Castle";
import Portal from "./entities/Portal";
import MouseInput from "./components/MouseInput";
import { levels } from "./levels";
import { Status as TowerStatus } from "./entities/towers/Tower";

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
            gameMap.width-1,
            gameMap.depth-1, 
            gameMap.getElevation(gameMap.width-1, gameMap.depth-1)
        );  // Assumes map is rectangular
        this.towers[0][0] = this.portal;
        this.towers[gameMap.width-1][gameMap.depth-1] = this.castle;

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

        this.mouseInput = new MouseInput();
        this.setPath(this.portal.position, this.castle.position);
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
        let {enemy, count, delay} = level;
        this.enemyInfo = {enemy, count, delay, remaining: count};
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

        this.handleEnemiesAtCastle();
        this.towersAttack();
        this.checkLevelOver();
    }

    
    startDefendPhase = () => {
        if (this.phase !== BUILD || this.over) return;
        this.phase = DEFEND;

        this.spawningEnemies = true;
        this.enemies = [];
        this.projectiles = [];
        
        this.commitTowers();
        
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
            if (!tower || !tower.getProjectilePath) continue;

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
                    if (!towerAttacked) { // prevent duplicate projectiles
                        const projectile = tower.createProjectile(path);
                        this.addProjectile(projectile);
                    }

                    // TODO: this is instant damage, convert to when projectile hits?
                    enemy.hp = Math.max(enemy.hp - tower.damage, 0);
    
                    towerAttacked = true;
                    if (!tower.canAttackMultiple) break;
                }
            }
            if (towerAttacked) tower.currentCooldown = tower.cooldown;
        }
    }

    handleEnemiesAtCastle = () => {
        for (const enemy of this.enemies)  {
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
}



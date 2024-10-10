import { djikstra, getSteps } from "./utils/game_utils";
import Castle from "./entities/Castle";
import Portal from "./entities/Portal";
import MouseInput from "./components/MouseInput";

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
        this.castle = new Castle(gameMap.width-1, gameMap.depth-1,
                gameMap.getElevation(gameMap.width-1, gameMap.depth-1));  // Assumes map is rectangular
        this.towers[0][0] = this.portal;
        this.towers[gameMap.width-1][gameMap.depth-1] = this.castle;

        this.enemies = [];
        this.spawningEnemies = false;
        this.projectiles = [];

        this.animationFunctions = [];
        this.spawnFunction = () => null;
        this.steps = [];
        this.gold = 250;

        this.mouseInput = new MouseInput();
    }

    setSteps = (spawn, goal, speed ) => {
        const path = djikstra(this.gameMap, spawn, goal);
        this.steps = getSteps(path, this.gameMap, speed || 1);
    }

    spawnEnemy = (enemy) => {
        const newEnemy = new enemy(...this.steps[0]);
        this.enemies.push(newEnemy);
        this.animationFunctions.push(newEnemy.getMoveFunction(this.steps));
    }

    setupEnemySpawn = (level) => {
        let {enemy, count, delay} = level;
        let currentDelay = 0;
        this.spawningEnemies = true;
        this.spawnFunction = () => {
            if (currentDelay) {
                currentDelay--;
            } else {
                if (count) {
                    this.spawnEnemy(enemy);
                    count--;
                } else {
                    this.spawnFunction = () => null;
                    this.spawningEnemies = false;
                }
                currentDelay = delay;
            }
        }
    };

    addProjectile = (projectile) => {
        this.projectiles.push(projectile);
        this.animationFunctions.push(projectile.getMoveFunction());
    };

    addTower = (tower) => {
        const [x, y, _] = tower.position;
        this.towers[x][y] = tower;
    };

    tick = () => {
        for (let fn of this.animationFunctions) fn();
        this.spawnFunction();
    };
}


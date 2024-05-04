import { djikstra, getSteps } from "./utils/game_utils";

const [BUILD, DEFEND, SCORE] = ['build', 'defend', 'score'];

export default class Game {
    constructor(gameMap) {
        this.level = 1;
        this.phase = BUILD;
        this.gameMap = gameMap;
        this.over = false;

        this.towers = new Array(gameMap.width).fill(null).map(() => new Array(gameMap.depth).fill(null));
        // game.towers is 2D, structures in GameCanvas will be flattened for rendering

        this.enemies = [];
        this.spawningEnemies = false;
        this.projectiles = [];
        
        this.animationFunctions = [];
        this.steps = [];
        this.gold = 250;
    }

    setSteps = (spawn, goal) => {
        const path = djikstra(this.gameMap, spawn, goal);
        this.steps = getSteps(path, this.gameMap.heightMap);
    }

    spawnEnemy = (enemy, position) => {
        const newEnemy = new enemy(...position);
        this.enemies.push(newEnemy);
        this.animationFunctions.push(newEnemy.getMoveFunction(this.steps));
    }

    spawnEnemies = (level) => {
        // remake path and steps in case of build phase changes
        const path = djikstra(this.gameMap);
        this.steps = getSteps(path, this.gameMap.heightMap);

        let {enemy, count, delay} = level;
        const interval = setInterval(() => {
            this.spawnEnemy(enemy);
            count--;
            if (!count) clearInterval(interval);
        }, delay);
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
    };
};


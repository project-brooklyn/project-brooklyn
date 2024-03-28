import { djikstra, getSteps } from "./utils/game_utils";

const [BUILD, DEFEND, SCORE] = ['build', 'defend', 'score'];

export default class Game {
    constructor(gameMap) {
        this.level = 0;
        this.phase = BUILD;
        this.gameMap = gameMap;

        this.towers = [];
        this.enemies = [];
        this.projectiles = [];
        
        this.animationFunctions = [];
        this.steps = []
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

    tick = () => {
        for (let fn of this.animationFunctions) fn();
    };
}


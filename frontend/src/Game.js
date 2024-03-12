import { djikstra, getSteps } from "./utils/game_utils";

const [BUILD, DEFEND, SCORE] = ['build', 'defend', 'score'];

export default class Game {
    constructor(gameMap, setEnemies) {
        this.level = 0;
        this.phase = BUILD;
        this.gameMap = gameMap;
        this.setEnemies = setEnemies;
        this.animationFunctions = [];
        this.steps = []

        setInterval(this.tick, 10);
    }

    spawnEnemy = (enemy) => {
        const newEnemy = new enemy(0, 1.25, 0);
        this.animationFunctions.push(newEnemy.getMoveFunction(this.steps));
        this.setEnemies(prev => [...prev, newEnemy]);
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

    tick = () => {
        for (let fn of this.animationFunctions) fn();
    }
}


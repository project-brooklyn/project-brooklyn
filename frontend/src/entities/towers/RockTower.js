import { getParabolicPath } from "../../utils/game_utils";
import Rock from "../projectiles/Rock";
import Tower from "./Tower";

export default class RockTower extends Tower {
    static price = 100;

    constructor (x, y, z, status) {
        super(x, y, z, 0.01, status);
        this.name = 'rockTower';
        this.cooldown = 50;
        this.currentCooldown = 0;
        this.damage = 20;
        this.price = RockTower.price;
        this.minRange = 2.5;
        this.maxRange = 6;
    }

    getProjectilePath = (target, gameMap) => {
        const path = getParabolicPath(
            this,
            target,
            gameMap,
            0.02, // timeInterval must be low to prevent rock passing through target
        );
        return path;
    };

    canHit = (target, gameMap) => { 
        return !!this.getProjectilePath(target, gameMap).length;
    }

    createProjectile = (path) => {
        this.currentCooldown = this.cooldown;
        this.rotateTowardsTarget(path.at(-1));
        return new Rock(...this.position, path);
    };
}

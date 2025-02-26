import { getStraightPath } from "../../utils/game_utils";
import Arrow from "../projectiles/Arrow";
import Tower from "./Tower";

export default class ArrowTower extends Tower {
    static price = 50;
    
    constructor (x, y, z, status) {
        super(x, y, z, status);
        this.name = 'arrowTower';
        this.cooldown = 25;
        this.currentCooldown = 0;
        this.damage = 10;
        this.price = ArrowTower.price;
        this.minRange = 1.5;
        this.maxRange = 4;
    }

    getProjectilePath = (target, gameMap) => {
        const path = getStraightPath(
            this,
            target,
            gameMap,
            0.2
        );
        return path;
    }

    canHit = (target, gameMap) => { 
        return !!this.getProjectilePath(target, gameMap).length;
    }

    createProjectile = (path) => {
        this.rotateTowardsTarget(path.at(-1));
        return new Arrow(...this.position, path);
    }
}

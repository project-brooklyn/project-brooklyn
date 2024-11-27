import { getStraightPath } from "../../utils/game_utils";
import Laser from "../projectiles/Laser";
import Tower from "./Tower";

export default class LaserTower extends Tower {
    static price = 200;

    constructor (x, y, z, status) {
        super(x, y, z, 0.01, status);
        this.name = 'laserTower';
        this.cooldown = 40;
        this.currentCooldown = 0;
        this.damage = 40;
        this.price = LaserTower.price
        this.minRange = 0;
        this.maxRange = 10;
    }

    getProjectilePath = (target, heightMap) => {
        const path = getStraightPath(
            this,
            target, 
            heightMap,
            0.4
        );
        return path;
    }

    createProjectile = (path) => {
        this.currentCooldown = this.cooldown;
        this.rotateTowardsTarget(path.at(-1));
        return new Laser(...this.position, path);
    }
}

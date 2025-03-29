import { getLinearTravelTime, getStraightPath } from "../../utils/game_utils";
import Laser from "../projectiles/Laser";
import Tower from "./Tower";

const LASER_SPEED = 0.5;

export default class LaserTower extends Tower {
    static price = 200;

    constructor(x, y, z, status) {
        super(x, y, z, status);
        this.name = 'laserTower';
        this.cooldown = 20;
        this.currentCooldown = 0;
        this.damage = 10;
        this.price = LaserTower.price;
        this.minRange = 2.5;
        this.maxRange = 10;
        this.height = 4.5;
        this.description = "Fires a rapid laser beam.";
    }

    getTravelTime = (target) => {
        return getLinearTravelTime(this.getTopOfTowerPosition(), target, LASER_SPEED);
    }

    getProjectilePath = (target, heightMap, travelTime) => {
        const path = getStraightPath(
            this,
            target,
            heightMap,
            travelTime,
        );
        return path;
    }

    createProjectile = (path) => {
        this.rotateTowardsTarget(path.at(-1));
        return new Laser(...this.position, path);
    }
}

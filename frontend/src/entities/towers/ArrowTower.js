import { getLinearTravelTime, getStraightPath } from "../../utils/game_utils";
import Arrow from "../projectiles/Arrow";
import Tower from "./Tower";

const ARROW_SPEED = 0.15;

export default class ArrowTower extends Tower {
    static price = 50;

    constructor(x, y, z, status) {
        super(x, y, z, status);
        this.name = 'arrowTower';
        this.cooldown = 25;
        this.currentCooldown = 0;
        this.damage = 10;
        this.price = ArrowTower.price;
        this.minRange = 1.5;
        this.maxRange = 4;
        this.height = 3.5;
        this.description = "Shoots arrows in a straight line.";
    }

    getTravelTime = (target) => {
        return getLinearTravelTime(this.getTopOfTowerPosition(), target, ARROW_SPEED);
    }

    getProjectilePath = (target, gameMap, travelTime) => {
        const path = getStraightPath(
            this,
            target,
            gameMap,
            travelTime,
        );
        return path;
    }

    createProjectile = (path) => {
        this.rotateTowardsTarget(path.at(-1));
        return new Arrow(...this.position, path);
    }
}

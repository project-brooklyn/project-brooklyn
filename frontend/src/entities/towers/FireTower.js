import { getLinearTravelTime, getStraightPath } from "../../utils/game_utils";
import Tower from "./Tower";
import Flame from "../projectiles/Flame";
import { BURNED } from "../statuses";

const FLAME_SPEED = 0.05;

export default class FireTower extends Tower {
    static price = 100;

    constructor(x, y, z, status) {
        super(x, y, z, status);
        this.name = 'fireTower';
        this.cooldown = 150;
        this.currentCooldown = 0;
        this.damage = 0;
        this.price = FireTower.price;
        this.minRange = 0.5;
        this.maxRange = 2.5;
        this.height = 3;
        this.appliedStatus = BURNED;
    }

    getTravelTime = (target) => {
        return getLinearTravelTime(this.getTopOfTowerPosition(), target, FLAME_SPEED);
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
        return new Flame(...this.position, path);
    }
}

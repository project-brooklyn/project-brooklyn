import { getParabolicPath, getParabolicTravelTime } from "../../utils/game_utils";
import Rock from "../projectiles/Rock";
import Tower from "./Tower";

export default class RockTower extends Tower {
    static price = 100;

    constructor(x, y, z, status) {
        super(x, y, z, status);
        this.name = 'rockTower';
        this.cooldown = 80;
        this.currentCooldown = 0;
        this.damage = 40;
        this.price = RockTower.price;
        this.minRange = 2.5;
        this.maxRange = 6;
        this.height = 4;
        this.description = "Launches a rock at enemies, dealing damage in an area on impact.";
    }

    getTravelTime = (target) => {
        return getParabolicTravelTime(this.getTopOfTowerPosition(), target);
    }

    getProjectilePath = (target, gameMap, travelTime) => {
        const path = getParabolicPath(
            this,
            target,
            gameMap,
            travelTime,
        );
        return path;
    }

    createProjectile = (path, target, enemies) => {
        this.rotateTowardsTarget(path.at(-1));
        return new Rock(...this.position, path, target, this.damage, enemies);
    }
}

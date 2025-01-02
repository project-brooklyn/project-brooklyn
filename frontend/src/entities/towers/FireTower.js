import { getStraightPath } from "../../utils/game_utils";
import Tower from "./Tower";
import Flame from "../projectiles/Flame";
import { BURNED } from "../statuses";

export default class FireTower extends Tower {
    static price = 100;

    constructor (x, y, z, status) {
        super(x, y, z, 0.012, status);
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
        return new Flame(...this.position, path);
    }
}

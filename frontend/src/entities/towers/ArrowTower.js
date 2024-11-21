import { getStraightPath } from "../../utils/game_utils";
import Arrow from "../projectiles/Arrow";
import Tower from "./Tower";

export default class ArrowTower extends Tower {
    constructor (x, y, z, status) {
        super(x, y, z, 0.01, status);
        this.name = 'arrowTower';
        this.cooldown = 25;
        this.currentCooldown = 0;
        this.damage = 10;
        this.minRange = 2;
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
    };

    createProjectile = (path) => {
        this.currentCooldown = this.cooldown;
        this.rotateTowardsTarget(path.at(-1));
        return new Arrow(...this.position, path);
    };
}

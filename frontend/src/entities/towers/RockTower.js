import { getParabolicPath } from "../../utils/game_utils";
import Rock from "../projectiles/Rock";
import Tower from "./Tower";

export default class RockTower extends Tower {
    constructor (x, y, z, status) {
        super(x, y, z, 0.01, status);
        this.name = 'rockTower';
        this.cooldown = 50;
        this.currentCooldown = 0;
        this.damage = 20;
    }

    getProjectilePath = (target, gameMap) => {
        const path = getParabolicPath(
            [
                this.position[0],
                this.position[1],
                this.position[2] + 3, // Add 3 to shoot from above the ground
            ],
            target,
            gameMap,
            0.02, // timeInterval must be low to prevent rock passing through target
        );
        return path;
    };

    createProjectile = (path) => {
        this.currentCooldown = this.cooldown;
        this.rotateTowardsTarget(path.at(-1));
        return new Rock(...this.position, path);
    };
}

import { getStraightPath } from "../../utils/game_utils";
import Arrow from "../projectiles/Arrow";
import Tower from "./Tower";

export default class ArrowTower extends Tower {
    constructor (x, y, z) {
        super(x, y, z, 0.075);
        this.name = 'arrowTower';
        this.cooldown = 25;
        this.currentCooldown = 0;
    };

    canAttack = (target, heightMap) => {
        if (this.currentCooldown) return false;

        const path = getStraightPath(
            [
                this.position[0],
                this.position[1],
                this.position[2] + 3, // Add 3 to shoot from above the ground
            ],
            target, 
            heightMap,
            0.2);
        if (!path.length) return false;

        return path;
    };

    createProjectile = (path) => {
        this.currentCooldown = this.cooldown;
        return new Arrow(...this.position, path);
    };
};
import { getParabolicPath } from "../../utils/game_utils";
import Rock from "../projectiles/Rock";
import Tower from "./Tower";

export default class RockTower extends Tower {
    constructor (x, y, z) {
        super(x, y, z, 0.075);
        this.name = 'rockTower';
        this.cooldown = 50;
        this.currentCooldown = 0;
    };

    canAttack = (target, heightMap) => {
        if (this.currentCooldown) return false;

        const path = getParabolicPath(
            [
                this.position[0],
                this.position[1],
                this.position[2], // Add 3 to shoot from above the ground
            ],
            target, 
            heightMap,
            0.02, // timeInterval must be low to prevent rock passing through target
        );
        if (!path.length) return false;

        return path;
    };

    createProjectile = (path) => {
        this.currentCooldown = this.cooldown;
        return new Rock(...this.position, path);
    };
};
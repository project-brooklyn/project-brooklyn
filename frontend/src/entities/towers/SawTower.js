import { getAdjacentTilePath } from "../../utils/game_utils";
import SawBlade from "../projectiles/SawBlade";
import Tower from "./Tower";

const SCALE = 0.01;

export default class SawTower extends Tower {
    static price = 150;

    constructor(x, y, z, status) {
        super(x, y, z, status, SCALE);
        this.name = 'sawTower';
        this.cooldown = 20;
        this.currentCooldown = 0;
        this.damage = 30;
        this.price = SawTower.price;
        this.minRange = 0;
        this.maxRange = 1;
        this.height = 3;
        this.canAttackMultiple = true;
    }

    getProjectilePath = (target, gameMap) => {
        return getAdjacentTilePath(this, target, gameMap);
    }

    createProjectile = (path) => {
        this.currentCooldown = this.cooldown;
        return new SawBlade(...this.position, path);
    }
}

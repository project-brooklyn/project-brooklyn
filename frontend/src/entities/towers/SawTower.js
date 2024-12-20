import { getAdjacentTilePath } from "../../utils/game_utils";
import SawBlade from "../projectiles/SawBlade";
import Tower from "./Tower";


export default class SawTower extends Tower {
    static price = 150;
    constructor (x, y, z, status) {
        super(x, y, z, 0.012, status);
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

    canHit = (target, gameMap) => {
        return !!this.getProjectilePath(target, gameMap).length;
    }

    createProjectile = (path) => {
        this.currentCooldown = this.cooldown;
        return new SawBlade(...this.position, path);
    }
}

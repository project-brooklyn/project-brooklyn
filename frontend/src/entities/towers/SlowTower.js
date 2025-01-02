import Tower from "./Tower";
import { isSameCell } from "../../utils/game_utils";
import { SLOWED } from "../statuses";

export default class SlowTower extends Tower {
    static price = 100;
    constructor (x, y, z, status) {
        super(x, y, z, 0.012, status);
        this.name = 'slowTower';
        this.cooldown = 0;
        this.currentCooldown = 0;
        this.damage = 0;
        this.price = SlowTower.price;
        this.minRange = 0;
        this.maxRange = 1;
        this.height = 1;
        this.canAttackMultiple = true;
        this.appliedStatus = SLOWED;
    }

    // the following is a little jank, should create a uniform Tower interface
    // and update Game.towersAttack() for more projectile flexibility
    canHit = (target, _gameMap) => {
        return isSameCell(this, target);
    }

    getProjectilePath = (target, gameMap) => {
        if (!this.canHit(target, gameMap)) return [];
        return [this.position, target.position];
    }

    createProjectile = (_path) => {
        this.currentCooldown = this.cooldown; // does nothing, currently cooldown == 0
        return null
    }
}

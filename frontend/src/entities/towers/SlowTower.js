import Tower from "./Tower";
import { isSameCell } from "../../utils/game_utils";
import { SLOWED } from "../statuses";

const SCALE = 0.01;

export default class SlowTower extends Tower {
    static price = 100;

    constructor (x, y, z, status) {
        super(x, y, z, status, SCALE);
        this.name = 'slowTower';
        this.cooldown = 0;
        this.currentCooldown = 0;
        this.damage = 0;
        this.price = SlowTower.price;
        this.minRange = 0;
        this.maxRange = 0;
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
        // current iteration has no cooldown, otherwise cooldown would be set here
        return null
    }
}

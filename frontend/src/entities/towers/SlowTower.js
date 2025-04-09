import Tower from "./Tower";
import { isSameCell } from "../../utils/game_utils";
import { SLOWED } from "../statuses";
import Projectile from "../projectiles/Projectile";

const SCALE = 0.01;

export default class SlowTower extends Tower {
    static price = 100;

    constructor(x, y, z, status) {
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
        this.description = "Slows down enemies that pass over this tower.";
    }

    getTravelTime = () => 1;

    getProjectilePath = (target, _gameMap, _travelTime) => {
        if (!isSameCell(this, target)) return null;
        return [this.position, target.position];
    }

    createProjectile = (_path, target, _enemies) => {
        // create a dummy projectile, which is never rendered or used
        // it applies the slow status and dies immediately
        const dummyProjectile = new Projectile();

        dummyProjectile.path = [];
        dummyProjectile.target = target
        dummyProjectile.appliedStatus = this.appliedStatus;
        dummyProjectile.instantEffect = true;

        dummyProjectile.effectFunction();
        dummyProjectile.hp = 0;
        return dummyProjectile;
    }

    canBuff(_buff) {
        return false;
    }
}

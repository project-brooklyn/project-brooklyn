import Tower from "./Tower";
import Spikes from "../projectiles/Spikes";
import { isSameCell } from "../../utils/game_utils";

const SPIKE_TICK_DURATION = 20;

export default class SpikeTower extends Tower {
    static price = 100;
    constructor (x, y, z, status) {
        super(x, y, z, 0.01, status);
        this.name = 'spikeTower';
        this.cooldown = 50;
        this.currentCooldown = 0;
        this.damage = 75;
        this.price = SpikeTower.price;
        this.minRange = 0;
        this.maxRange = 1;
        this.height = 1;
        this.canAttackMultiple = true;
    }

    canHit = (target, _gameMap) => {
        return isSameCell(this, target);
    }

    getProjectilePath = (target, gameMap) => {
        if (!this.canHit(target, gameMap)) return [];
        return Array(SPIKE_TICK_DURATION).fill(this.position);
    }

    createProjectile = (path) => {
        this.currentCooldown = this.cooldown;
        return new Spikes(...this.position, path);
    }
}

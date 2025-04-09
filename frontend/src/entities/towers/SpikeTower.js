import Tower from "./Tower";
import Spikes from "../projectiles/Spikes";
import { isSameCell } from "../../utils/game_utils";

const SPIKE_TICK_DURATION = 20;
const SCALE = 0.01;

export default class SpikeTower extends Tower {
    static price = 100;

    constructor(x, y, z, status) {
        super(x, y, z, status, SCALE);
        this.name = 'spikeTower';
        this.cooldown = 50;
        this.currentCooldown = 0;
        this.damage = 75;
        this.price = SpikeTower.price;
        this.minRange = 0;
        this.maxRange = 0;
        this.height = 1;
    }

    getTravelTime = () => 1;

    getProjectilePath = (target, _gameMap, _travelTime) => {
        if (!isSameCell(this, target)) return null;
        return Array(SPIKE_TICK_DURATION).fill(this.position);
    }

    createProjectile = (path, target, enemies) => {
        return new Spikes(...this.position, path, target, this.damage, enemies);
    }
}

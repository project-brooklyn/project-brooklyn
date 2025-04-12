import { getAdjacentTilePath } from "../../utils/game_utils";
import SawBlade from "../projectiles/SawBlade";
import Tower from "./Tower";

const SCALE = 0.01;
const SAW_BLADE_TICK_DURATION = 20;

export default class SawTower extends Tower {
    static price = 150;

    constructor(x, y, z, status) {
        super(x, y, z, status, SCALE);
        this.name = 'sawTower';
        this.cooldown = 50;
        this.currentCooldown = 0;
        this.damage = 30;
        this.price = SawTower.price;
        this.minRange = 0;
        this.maxRange = 1;
        this.height = 3;
        this.description = "Deploys saw blades laterally, damaging adjacent enemies at similar heights.";
    }

    getTravelTime = () => 1;

    getProjectilePath = (target, _gameMap, _travelTime) => {
        return getAdjacentTilePath(this, target, SAW_BLADE_TICK_DURATION);
    }

    createProjectile = (path, target, enemies) => {
        return new SawBlade(...this.position, path, target, this.damage, enemies);
    }
}

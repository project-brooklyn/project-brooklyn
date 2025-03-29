import Tower from "./Tower";
import Wrench from "../projectiles/Wrench";
import { getUpwardPath } from "../../utils/game_utils";

const SCALE = 0.02;
const WRENCH_SPEED = 0.04;
const WRENCH_STEPS = 50;

export default class RepairTower extends Tower {
    static price = 100;

    constructor(x, y, z, status) {
        super(x, y, z, status, SCALE);
        this.name = 'repairTower';
        this.cooldown = 100;
        this.currentCooldown = 0;
        this.price = RepairTower.price;
        this.height = 3;
    }

    getTravelTime = () => {
        return WRENCH_STEPS;
    }

    getProjectilePath = () => {
        return getUpwardPath(this, WRENCH_SPEED, WRENCH_STEPS);
    }

    createProjectile = (path) => {
        return new Wrench(...this.position, path);
    }

    upkeep = (game) => {
        game.castle.hp = Math.min(game.castle.hp + 100, game.castle.maxHp);
    }

}

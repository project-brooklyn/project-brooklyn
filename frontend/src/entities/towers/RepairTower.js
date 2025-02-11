import Tower from "./Tower";
import Wrench from "../projectiles/Wrench";
import { getUpwardPath } from "../../utils/game_utils";

export default class RepairTower extends Tower {
    static price = 100;

    constructor(x, y, z, status) {
        super(x, y, z, 0.01, status);
        this.name = 'repairTower';
        this.cooldown = 100;
        this.currentCooldown = 0;
        this.price = RepairTower.price;
    }

    getProjectilePath = () => {
        return getUpwardPath(this);
    }

    canHit = () => false;

    createProjectile = (path) => {
        return new Wrench(...this.position, path);
    }

    upkeep = (game) => {
        game.castle.hp = Math.min(game.castle.hp + 100, game.castle.maxHp);
    }
    
}

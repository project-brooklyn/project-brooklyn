import Tower from "./Tower";
import Dollar from "../projectiles/Dollar";
import { getUpwardPath } from "../../utils/game_utils";

const SCALE = 0.02;

export default class MoneyTower extends Tower {
    static price = 150;

    constructor(x, y, z, status) {
        super(x, y, z, status, SCALE);
        this.name = 'moneyTower';
        this.cooldown = 100;
        this.currentCooldown = 0;
        this.price = MoneyTower.price;
    }
  
    getProjectilePath = () => {
        return getUpwardPath(this);
    }

    canHit = () => false;

    createProjectile = (path) => {
        return new Dollar(...this.position, path);
    }

    upkeep = (game) => {
        game.gold += 50;
    }
}

import Tower from "./Tower";
import Dollar from "../projectiles/Dollar";
import { getUpwardPath } from "../../utils/game_utils";

const SCALE = 0.02;
const DOLLAR_SIGN_SPEED = 0.04;
const DOLLAR_SIGN_STEPS = 50;
const GOLD_PER_LEVEL = 50;

export default class MoneyTower extends Tower {
    static price = 150;

    constructor(x, y, z, status) {
        super(x, y, z, status, SCALE);
        this.name = 'moneyTower';
        this.cooldown = 100;
        this.currentCooldown = 0;
        this.price = MoneyTower.price;
        this.height = 3;
    }

    getTravelTime = () => {
        return DOLLAR_SIGN_STEPS;
    }

    getProjectilePath = () => {
        return getUpwardPath(this, DOLLAR_SIGN_SPEED, DOLLAR_SIGN_STEPS);
    }

    createProjectile = (path) => {
        return new Dollar(...this.position, path);
    }

    upkeep = (game) => {
        game.gold += GOLD_PER_LEVEL;
    }
}

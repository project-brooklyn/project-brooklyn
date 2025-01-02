import Tower from "./Tower";
import { isSameCell } from "../../utils/game_utils";

export default class SlowTower extends Tower {
    static price = 100;
    constructor (x, y, z, status) {
        super(x, y, z, 0.012, status);
        this.name = 'slowTower';
        this.cooldown = 50;
        this.currentCooldown = 0;
        this.damage = 0;
        this.price = SlowTower.price;
        this.minRange = 0;
        this.maxRange = 1;
        this.height = 1;
        this.canAttackMultiple = true;
    }

    canHit = (target, _gameMap) => {
        return isSameCell(this, target);
    }

}

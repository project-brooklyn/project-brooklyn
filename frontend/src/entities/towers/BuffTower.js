import { getAdjacentTilePath } from "../../utils/game_utils";
import Tower from "./Tower";

export const BUFFED = "BUFFED";

export default class BuffTower extends Tower {
    static price = 100;
    constructor (x, y, z, status) {
        super(x, y, z, 0.012, status);
        this.name = 'buffTower';
        this.price = BuffTower.price;
        this.minRange = 0;
        this.maxRange = 1;
        this.height = 5;
    }

    getProjectilePath = (target, gameMap) => {
        return getAdjacentTilePath(this, target, gameMap);
    }

    canHit = (target, gameMap) => {
        return !!this.getProjectilePath(target, gameMap).length;
    }

}

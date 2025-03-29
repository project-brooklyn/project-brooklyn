import { getParabolicPath } from "../../utils/game_utils";
import Snowball from "../projectiles/Snowball";
import { FROZEN } from "../statuses";
import Tower from "./Tower";


export default class IceTower extends Tower {
    static price = 100;

    constructor(x, y, z, status) {
        super(x, y, z, status);
        this.name = 'iceTower';
        this.cooldown = 150;
        this.currentCooldown = 0;
        this.damage = 0;
        this.price = IceTower.price;
        this.minRange = 2.5;
        this.maxRange = 4.5;
        this.height = 3;
        this.appliedStatus = FROZEN;
    }

    getProjectilePath = (target, gameMap) => {
        const path = getParabolicPath(
            this,
            target,
            gameMap,
            0.02
        );
        return path;
    }
    createProjectile = (path) => {
        this.rotateTowardsTarget(path.at(-1));
        return new Snowball(...this.position, path);
    }
}

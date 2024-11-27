import ArrowTower from "./ArrowTower";
import LaserTower from "./LaserTower";
import RockTower from "./RockTower";

const TOWERS = new Map([
    ["arrowTower", {
        create: ArrowTower,
        price: ArrowTower.price,
    }],
    ["rockTower", {
        create: RockTower,
        price: RockTower.price,
    }],
    ["laserTower", {
        create: LaserTower,
        price: LaserTower.price,
    }],
]);

export default TOWERS;

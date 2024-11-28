import ArrowTower from "./towers/ArrowTower";
import LaserTower from "./towers/LaserTower";
import RockTower from "./towers/RockTower";

export const TOWERS = new Map([
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

export const TERRAFORM_FILL = "terraformFill";
export const TERRAFORM_DIG = "terraformDig";
export const TERRAFORMS = new Map([
    [TERRAFORM_FILL, {
        label: "Fill",
        price: 10,
    }],
    [TERRAFORM_DIG, {
        label: "Dig",
        price: 10,
    }],
]);

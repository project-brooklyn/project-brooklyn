import ArrowTower from "./towers/ArrowTower";
import BuffTower from "./towers/BuffTower";
import FireTower from "./towers/FireTower";
import IceTower from "./towers/IceTower";
import LaserTower from "./towers/LaserTower";
import RockTower from "./towers/RockTower";
import SawTower from "./towers/SawTower";
import SlowTower from "./towers/SlowTower";
import SpikeTower from "./towers/SpikeTower";

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
    ["sawTower", {
        create: SawTower,
        price: SawTower.price,
    }],
    ["spikeTower", {
        create: SpikeTower,
        price: SpikeTower.price,
    }],
    ["buffTower", {
        create: BuffTower,
        price: BuffTower.price,
    }],
    ["fireTower", {
        create: FireTower,
        price: FireTower.price,
    }],
    ["slowTower", {
        create: SlowTower,
        price: SlowTower.price,
    }],
    ["iceTower", {
        create: IceTower,
        price: IceTower.price,
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

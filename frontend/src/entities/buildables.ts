import ArrowTower from "./towers/ArrowTower";
import BuffTower from "./towers/BuffTower";
import FireTower from "./towers/FireTower";
import IceTower from "./towers/IceTower";
import LaserTower from "./towers/LaserTower";
import RockTower from "./towers/RockTower";
import SawTower from "./towers/SawTower";
import SlowTower from "./towers/SlowTower";
import SpikeTower from "./towers/SpikeTower";
import MoneyTower from "./towers/MoneyTower";
import RepairTower from "./towers/RepairTower";

export enum TowerType {
    ArrowTower = "arrowTower",
    BuffTower = "buffTower",
    FireTower = "fireTower",
    IceTower = "iceTower",
    LaserTower = "laserTower",
    MoneyTower = "moneyTower",
    RepairTower = "repairTower",
    RockTower = "rockTower",
    SawTower = "sawTower",
    SlowTower = "slowTower",
    SpikeTower = "spikeTower",
}

export const TOWERS = new Map([
    ["arrowTower", {
        create: ArrowTower,
        price: ArrowTower.price,
    }],
    ["buffTower", {
        create: BuffTower,
        price: BuffTower.price,
    }],
    ["fireTower", {
        create: FireTower,
        price: FireTower.price,
    }],
    ["iceTower", {
        create: IceTower,
        price: IceTower.price,
    }],
    ["laserTower", {
        create: LaserTower,
        price: LaserTower.price,
    }],
    ["moneyTower", {
        create: MoneyTower,
        price: MoneyTower.price,
    }],
    ["repairTower", {
        create: RepairTower,
        price: RepairTower.price,
    }],
    ["rockTower", {
        create: RockTower,
        price: RockTower.price,
    }],
    ["sawTower", {
        create: SawTower,
        price: SawTower.price,
    }],
    ["slowTower", {
        create: SlowTower,
        price: SlowTower.price,
    }],
    ["spikeTower", {
        create: SpikeTower,
        price: SpikeTower.price,
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

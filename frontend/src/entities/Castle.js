import * as THREE from "three";
import Entity from "./Entity";
import { Status } from "./towers/Tower";
import { round } from "../utils/math_utils";

const SCALE = 0.007;

export default class Castle extends Entity {
    constructor(x, y, z) {
        super(x, y, z, new THREE.Quaternion(), SCALE);
        this.hp = 1000;
        this.maxHp = 1000;
        this.name = "castle";
        this.rotation = [0, Math.PI / 4, 0];
        this.height = 0;
        this.status = Status.PERMANENT;
        this.description = "This is your castle. Prevent the enemies from reaching it!"
        this.buffs = new Set();
    }

    takeDamage = (damage) => {
        this.hp -= damage;
        this.hp = Math.max(0, round(this.hp));
    }
}

import * as THREE from 'three';
import Projectile from "./Projectile";

export default class Laser extends Projectile {
    constructor(x, y, z, path, target, damage) {
        const quaternion = new THREE.Quaternion();
        super(x, y, z, quaternion, path);

        this.name = "laser";
        this.target = target;
        this.damage = damage;
    }
}

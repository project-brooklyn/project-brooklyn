import * as THREE from 'three';
import Projectile from "./Projectile";

export default class SawBlade extends Projectile {
    constructor(x, y, z, path, target, damage, enemies) {
        const quaternion = new THREE.Quaternion();
        super(x, y, z, quaternion, path);

        this.name = "sawBlade";
        this.target = target;
        this.damage = damage;
        this.enemies = enemies;
        this.splashRange = 1;
        this.instantEffect = true;
    }
}

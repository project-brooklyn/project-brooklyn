import * as THREE from 'three';
import Projectile from "./Projectile";

export default class Spikes extends Projectile {
    constructor(x, y, z, path, target, damage, enemies) {
        const quaternion = new THREE.Quaternion();
        quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, -1), new THREE.Vector3(0, -1, 0));
        super(x, y, z, quaternion, path);

        this.name = "spikes";
        this.target = target;
        this.damage = damage;
        this.enemies = enemies;
        this.splashRange = 0.5;
        this.instantEffect = true;
    }
}

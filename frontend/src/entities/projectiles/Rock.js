import * as THREE from 'three';
import Projectile from "./Projectile";

export const ROCK_SCALE = 0.015;

export default class Rock extends Projectile {
    constructor(x, y, z, path, target, damage, enemies) {
        const quaternion = new THREE.Quaternion();
        super(x, y, z, quaternion, path, ROCK_SCALE);

        this.name = "rock";
        this.target = target;
        this.damage = damage;
        this.enemies = enemies;
        this.splashRange = 1.5;
    }
}

import * as THREE from 'three';
import Projectile from "./Projectile";

export const ROCK_SCALE = 0.005;

export default class Rock extends Projectile {
    constructor (x, y, z, path, scale = ROCK_SCALE) {
        const quaternion = new THREE.Quaternion();
        super(x, y, z, quaternion, path, scale);
        this.name = "rock";
    }
}

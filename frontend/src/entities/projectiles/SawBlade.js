import * as THREE from 'three';
import Projectile from "./Projectile";

export default class SawBlade extends Projectile {
    constructor (x, y, z, path, scale) {
        const quaternion = new THREE.Quaternion();
        super(x, y, z, quaternion, path, scale);
        this.name = "sawBlade";
    }
}

import * as THREE from 'three';
import Projectile from "./Projectile";

export default class Dollar extends Projectile {
    constructor(x, y, z, path, scale=0.01) {
        const quaternion = new THREE.Quaternion();
        super(x, y, z, scale, quaternion, path);
        this.name = "dollar";
    }
}

import * as THREE from 'three';
import Projectile from "./Projectile";

export default class Dollar extends Projectile {
    constructor(x, y, z, path) {
        const quaternion = new THREE.Quaternion();
        super(x, y, z, quaternion, path);
        this.name = "dollar";
    }
}

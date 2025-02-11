import * as THREE from 'three';
import Projectile from "./Projectile";

export default class Wrench extends Projectile {
    constructor(x, y, z, path, scale=0.003) {
        const quaternion = new THREE.Quaternion();
        super(x, y, z, scale, quaternion, path);
        this.name = "wrench";
    }
}

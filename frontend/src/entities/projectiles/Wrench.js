import * as THREE from 'three';
import Projectile from "./Projectile";

const WRENCH_SCALE = 0.003;

export default class Wrench extends Projectile {
    constructor(x, y, z, path, scale=WRENCH_SCALE) {
        const quaternion = new THREE.Quaternion();
        super(x, y, z, quaternion, path, scale);
        this.name = "wrench";
    }
}

import * as THREE from 'three';
import Projectile from "./Projectile";

const DEFAULT_SCALE = 0.005

export default class Snowball extends Projectile {
    constructor (x, y, z, path, scale=DEFAULT_SCALE) {
        const quaternion = new THREE.Quaternion();
        super(x, y, z, scale, quaternion, path);
        this.name = "snowball";
    }
}

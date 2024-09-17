import * as THREE from 'three';
import Projectile from "./Projectile";

export default class Laser extends Projectile {
    constructor (x, y, z, path) {
        const quaternion = new THREE.Quaternion();

        super(x, y, z, 0.005, quaternion, path);
        this.name = "laser";
    };

};

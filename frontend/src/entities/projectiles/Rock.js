import * as THREE from 'three';

import Projectile from "./Projectile";

export default class Rock extends Projectile {
    constructor (x, y, z, path) {
        const scale = 0.005;
        const quaternion = new THREE.Quaternion();
        super(x, y, z, scale, quaternion, path);
        this.name = "rock";
    };

};

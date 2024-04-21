import * as THREE from 'three';

import Projectile from "./Projectile";

const EPS = 0.0001

export default class Arrow extends Projectile {
    constructor (x, y, z, path) {
        const scale = 0.01;

        // Determine rotation based on the start & end of path.
        const start = new THREE.Vector3().fromArray(path.at(0)).setZ(0);
        const end = new THREE.Vector3().fromArray(path.at(-1)).setZ(0);
        const yvec = new THREE.Vector3(EPS, 1, 0);

        let v = new THREE.Vector3().subVectors(end, start);
        const angle = v.angleTo(yvec)
        const cross = new THREE.Vector3().crossVectors(v, yvec);

        let rotation = [0.0, 0.0, 0.0];
        if (cross.z >= 0.0) {
            rotation[2] = angle;
        }
        else {
            rotation[2] = 2 * Math.PI - angle;
        }

        super(x, y, z, scale, rotation, path);
        this.name = "arrow";
    };


};

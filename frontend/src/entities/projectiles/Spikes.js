import * as THREE from 'three';
import Projectile from "./Projectile";
import { DEFAULT_ARROW_SCALE } from './Arrow';

export default class Spikes extends Projectile {
    constructor (x, y, z, path) {
        const quaternion = new THREE.Quaternion();
        quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, -1), new THREE.Vector3(0, -1, 0));
        super(x, y, z, DEFAULT_ARROW_SCALE, quaternion, path);
        this.name = "spikes";
    }
}

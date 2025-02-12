import * as THREE from 'three';
import Projectile from "./Projectile";
import { ROCK_SCALE } from './Rock';

export default class Snowball extends Projectile {
    constructor (x, y, z, path, scale = ROCK_SCALE) {
        const quaternion = new THREE.Quaternion();
        super(x, y, z, quaternion, path, scale);
        this.name = "snowball";
    }
}

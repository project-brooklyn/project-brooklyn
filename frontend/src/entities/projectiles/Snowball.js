import * as THREE from 'three';
import Projectile from "./Projectile";
import { ROCK_SCALE } from './Rock';
import { FROZEN } from '../statuses';

export default class Snowball extends Projectile {
    constructor(x, y, z, path, target, enemies) {
        const quaternion = new THREE.Quaternion();
        super(x, y, z, quaternion, path, ROCK_SCALE);

        this.name = "snowball";
        this.target = target;
        this.enemies = enemies;
        this.splashRange = 1.0;
        this.appliedStatus = FROZEN;
    }
}

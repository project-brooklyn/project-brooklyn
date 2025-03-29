import * as THREE from 'three';
import Entity from "../Entity";

export const Status = {
    PLANNING: Symbol("planning"),   // Not yet added to the map, used for preview
    PENDING: Symbol("pending"),     // Added to the map during the current build phase
    BUILT: Symbol("built"),         // Added to the map during a prior build phase
    PERMANENT: Symbol("permanent"), // Can't be built or sold (portal and castle)
};

const DEFAULT_TOWER_SCALE = 0.015;

export default class Tower extends Entity {
    constructor(x, y, z, status, scale = DEFAULT_TOWER_SCALE) {
        super(x, y, z, new THREE.Quaternion(), scale);
        this.hp = Infinity;
        this.status = status;
        this.height = 2.5; // default height for projectile launch
        this.buffs = new Set();
    }

    rotateTowardsTarget(target) {
        const [dx, dy] = [target[0] - this.x, target[1] - this.y];
        this.rotation[1] = Math.atan2(-dy, dx); // around render coordinates z axis
    }
}

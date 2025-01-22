import Entity from "../Entity";

export const Status = {
    PLANNING: Symbol("planning"),  // Not yet added to the map, used for preview
    PENDING: Symbol("pending"),    // Added to the map during the current build phase
    BUILT: Symbol("built"),        // Added to the map during a prior build phase
};

export default class Tower extends Entity {
    constructor (x, y, z, scale, status) {
        super(x, y, z, scale);
        this.hp = Infinity;
        this.status = status;
        this.height = 2.5; // default height for projectile launch
        this.buffs = {};
    }

    rotateTowardsTarget(target) {
        const [dx, dy] = [target[0]-this.x, target[1]-this.y];
        this.rotation[1] = Math.atan2(-dy, dx); // around render coordinates z axis
    }
}

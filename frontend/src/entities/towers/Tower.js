import Entity from "../Entity";

export const Status = {
    PENDING: Symbol("pending"),
    BUILT: Symbol("built"),
};

export default class Tower extends Entity {
    constructor (x, y, z, scale, status) {
        super(x, y, z, scale);
        this.hp = Infinity;
        this.status = status;
    }

    rotateTowardsTarget(target) {
        const [dx, dy] = [target[0]-this.x, target[1]-this.y];
        this.rotation[1] = Math.atan2(-dy, dx); // around render coordinates z axis
    }
}

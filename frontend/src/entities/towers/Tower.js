import Entity from "../Entity";

export default class Tower extends Entity {
    constructor (x, y, z, scale) {
        super(x, y, z, scale);
        this.hp = Infinity;
    }

    rotateTowardsTarget(target) {
        const [dx, dy] = [target[0]-this.x, target[1]-this.y];
        this.rotation[1] = Math.atan2(-dy, dx); // around render coordinates z axis
    }
}

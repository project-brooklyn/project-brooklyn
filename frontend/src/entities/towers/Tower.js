import Entity from "../Entity";

export default class Tower extends Entity {
    constructor (x, y, z, scale) {
        super(x, y, z, scale);
        this.hp = Infinity;
        this.disabled = false;
    }
}

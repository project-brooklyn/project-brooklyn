import Entity from "./Entity";

export default class Portal extends Entity {
    constructor (x,y,z) {
        super(x, y, z, 0.1);
        this.name = "portal";
        this.hp = Infinity;
    }
}

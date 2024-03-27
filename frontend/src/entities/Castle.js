import Entity from "./Entity";

export default class Castle extends Entity {
    constructor (x,y,z) {
        super(x, y, z, 0.005);
        this.hp = 100
        this.maxHp = 100
        this.name = "castle";
    }
}

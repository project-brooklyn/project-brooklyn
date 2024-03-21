import Entity from "./Entity";

export default class Guy extends Entity {
    constructor (x,y,z) {
        super(x, y, z, 0.3);
        this.name = "guy";
        this.hp = 100;

        this.offset = {x: 0, y: 0, z: 0};
    }
}

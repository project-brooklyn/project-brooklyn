import Enemy from "./Enemy";

export default class Guy extends Enemy {
    constructor (x,y,z) {
        super(x, y, z, 0.2);
        this.name = "guy";
        this.hp = 100;

        this.offset = {x: 0, y: 0, z: 0};
    }
}

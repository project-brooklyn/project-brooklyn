import Enemy from "./Enemy";

export default class Guy extends Enemy {
    constructor (x,y,z) {
        super(x, y, z, 0.2);
        this.name = "guy";
        this.maxHp = 100;
        this.hp = this.maxHp;
    }
}

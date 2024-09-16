import Enemy from "./Enemy";

export default class Guy extends Enemy {
    static SPEED = 2;
    constructor (x, y, z, scale) {
        super(x, y, z, scale ?? 0.01);
        this.name = "guy";
        this.maxHp = 100;
        this.hp = this.maxHp;
    }
}

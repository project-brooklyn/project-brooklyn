import Enemy from "./Enemy";

export default class Cow extends Enemy {
    static SPEED = 0.5;
    constructor (x, y, z, scale) {
        super(x, y, z, scale ?? 0.01);
        this.name = "cow";
        this.maxHp = 200;
        this.hp = this.maxHp;
    }
}

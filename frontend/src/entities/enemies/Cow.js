import Enemy from "./Enemy";

export default class Cow extends Enemy {
    static SPEED = 1;
    static MAX_HP = 200;
    static NAME = "cow";

    constructor (x, y, z, scale) {
        super(x, y, z, scale);
        this.name = Cow.NAME;
        this.maxHp = Cow.MAX_HP;
        this.hp = this.maxHp;
    }
}

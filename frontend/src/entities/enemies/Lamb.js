import Enemy from "./Enemy";

export default class Lamb extends Enemy {
    static SPEED = 6;
    static MAX_HP = 20;
    static NAME = "lamb";

    constructor (x, y, z, scale) {
        super(x, y, z, scale ?? 0.01);
        this.name = Lamb.NAME;
        this.maxHp = Lamb.MAX_HP;
        this.hp = this.maxHp;
    }
}

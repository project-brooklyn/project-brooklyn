import Enemy from "./Enemy";

export default class Lamb extends Enemy {
    static SPEED = 6;
    static MAX_HP = 20;

    constructor (x, y, z, scale) {
        super(x, y, z, scale ?? 0.01);
        this.name = "lamb";
        this.maxHp = Lamb.MAX_HP;
        this.hp = this.maxHp;
    }
}

import Enemy from "./Enemy";

export default class Guy extends Enemy {
    static SPEED = 2;
    static MAX_HP = 100;
    static NAME = "guy";

    constructor (x, y, z, scale) {
        super(x, y, z, scale ?? 0.01);
        this.name = Guy.NAME;
        this.maxHp = Guy.MAX_HP;
        this.hp = this.maxHp;
    }
}

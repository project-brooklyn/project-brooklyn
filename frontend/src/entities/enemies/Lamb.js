import Enemy from "./Enemy";

export default class Lamb extends Enemy {
    constructor (x, y, z, scale) {
        super(x, y, z, scale ?? 0.01);
        this.name = "lamb";
        this.maxHp = 20;
        this.hp = this.maxHp;
    }
}

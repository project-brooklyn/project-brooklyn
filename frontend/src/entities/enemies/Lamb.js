import Enemy from "./Enemy";

export default class Lamb extends Enemy {
    static SPEED = 6;
    static MAX_HP = 20;
    static NAME = "lamb";

    constructor(x, y, z, game, scale) {
        super(x, y, z, game, Lamb.MAX_HP, scale);
        this.name = Lamb.NAME;
    }
}

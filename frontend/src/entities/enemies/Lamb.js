import Enemy from "./Enemy";

export default class Lamb extends Enemy {
    static SPEED = 3;
    static MAX_HP = 50;
    static NAME = "lamb";
    static DESCRIPTION = "A lamb. It is fast, but weak.";

    constructor(x, y, z, game, scale) {
        super(x, y, z, game, Lamb.MAX_HP, scale);
        this.name = Lamb.NAME;
    }
}

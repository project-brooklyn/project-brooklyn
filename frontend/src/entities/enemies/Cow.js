import Enemy from "./Enemy";

export default class Cow extends Enemy {
    static SPEED = 1;
    static MAX_HP = 200;
    static NAME = "cow";

    constructor(x, y, z, game, scale) {
        super(x, y, z, game, Cow.MAX_HP, scale);
        this.name = Cow.NAME;
    }
}

import Enemy from "./Enemy";

export default class Cockroach extends Enemy {
    static SPEED = 1.5;
    static MAX_HP = 50;
    static NAME = "cockroach";
    static DESCRIPTION = "A cockroach. It is a very small insect. It is very fast and hard to hit. You can kill it with a shoe.";

    constructor(x, y, z, game, scale) {
        super(x, y, z, game, Cockroach.MAX_HP, scale);
        this.name = Cockroach.NAME;
    }
}

import Enemy from "./Enemy";

export default class Alligator extends Enemy {
    static SPEED = 1.2;
    static MAX_HP = 300;
    static NAME = "alligator";
    static DESCRIPTION = "An alligator. It is a very big animal. It is very slow, but strong and durable.";

    constructor(x, y, z, game, scale) {
        super(x, y, z, game, Alligator.MAX_HP, scale);
        this.name = Alligator.NAME;
    }
}

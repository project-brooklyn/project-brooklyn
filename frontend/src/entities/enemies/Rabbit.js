import Enemy from "./Enemy";

export default class Rabbit extends Enemy {
    static SPEED = 4;
    static MAX_HP = 50;
    static NAME = "rabbit";
    static DESCRIPTION = "A rabbit. Another prolific animal, but faster than a mouse.";

    constructor(x, y, z, game, scale) {
        super(x, y, z, game, Rabbit.MAX_HP, scale);
        this.name = Rabbit.NAME;
    }
}

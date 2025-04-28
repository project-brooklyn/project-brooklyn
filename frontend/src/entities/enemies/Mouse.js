import Enemy from "./Enemy";

export default class Mouse extends Enemy {
    static SPEED = 2;
    static MAX_HP = 50;
    static NAME = "mouse";
    static DESCRIPTION = "A mouse. Very prolific, but average speed and low health.";

    constructor(x, y, z, game, scale) {
        super(x, y, z, game, Mouse.MAX_HP, scale);
        this.name = Mouse.NAME;
    }
}

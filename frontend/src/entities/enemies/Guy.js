import Enemy from "./Enemy";

export default class Guy extends Enemy {
    static SPEED = 2;
    static MAX_HP = 100;
    static NAME = "guy";
    static DESCRIPTION = "An evil robot. A mindless machine with only one purpose, to destroy your castle.";

    constructor(x, y, z, game, scale) {
        super(x, y, z, game, Guy.MAX_HP, scale);
        this.name = Guy.NAME;
    }
}

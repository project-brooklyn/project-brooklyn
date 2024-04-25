import Enemy from "./Enemy";

export default class Guy extends Enemy {
    constructor (x, y, z, scale) {
        super(x, y, z, scale ?? 0.2);
        this.name = "guy";
        this.maxHp = 100;
        this.hp = this.maxHp;

        this.offset = {x: 0, y: 0, z: 0};
    }
}

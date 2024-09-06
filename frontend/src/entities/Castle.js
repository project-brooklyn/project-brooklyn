import Entity from "./Entity";

export default class Castle extends Entity {
    constructor (x,y,z) {
        super(x, y, z, .005);
        this.hp = 1000;
        this.maxHp = 1000;
        this.name = "castle";
    };

    takeDamage = (damage) => {
        this.hp -= damage;
        if (this.hp <= 0) {
            this.hp = 0;
        }
    };
}

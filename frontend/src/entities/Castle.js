import Entity from "./Entity";
import { Status } from "./towers/Tower";

export default class Castle extends Entity {
    constructor (x,y,z) {
        super(x, y, z, .005);
        this.hp = 1000;
        this.maxHp = 1000;
        this.name = "castle";
        this.rotation = [0, Math.PI/4, 0];
        this.height = 0;
        this.status = Status.PERMANENT;
        this.description = "This is your castle. Prevent the enemies from reaching it!"
    }

    takeDamage = (damage) => {
        this.hp -= damage;
        if (this.hp <= 0) {
            this.hp = 0;
        }
    }

    canHit = () => false;
}

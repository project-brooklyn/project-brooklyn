import Entity from "../Entity"; 

export default class Projectile extends Entity {
    constructor (x, y, z, scale, path) {
        super(x, y, z, scale);
        this.path = path;

        this.hp = Infinity;
    }

};

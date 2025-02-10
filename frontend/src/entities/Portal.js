import Entity from "./Entity";
import { Status } from "./towers/Tower";

export default class Portal extends Entity {
    constructor (x,y,z) {
        super(x, y, z, 0.01);
        this.name = "portal";
        this.hp = Infinity;
        this.offset = {x: 0.25, y: 0.25, z: 0}; // place portal at back of tile, so enemies spawn in front
        this.rotation = [0, Math.PI/4, 0]; // rotate portal to face castle
        this.height = 0;
        this.status = Status.PERMANENT;
        this.description = "This is the portal from which enemies will spawn."
    }

    canHit = () => false;
}


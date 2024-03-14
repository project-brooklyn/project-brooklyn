import Entity from "./Entity";

export default class Guy extends Entity {
    constructor (x,y,z) {
        super('./guy.glb', x, y, z, 0.2);
        this.name = "Guy";
        this.hp = 100;

        // some models are centered at 0,0, but some start at 0,0
        // would be better with model width, should be fixed w/ custom models
        this.offset = {x: 0, y: 0.12, z: 0};
    }
}

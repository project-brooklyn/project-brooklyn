import Entity from "./Entity";

export default class Portal extends Entity {
    constructor (x,y,z) {
        super('./portal1s.glb', x, y, z, 0.1, Math.PI/4);
        this.name = "Portal";
        this.hp = Infinity;
    }
}


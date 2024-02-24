import Entity from "./Entity";

export default class Guy extends Entity {
    constructor (x,y,z) {
        super('./guy.glb', x, y, z, 0.2);
    }
}

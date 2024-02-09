import Enemy from "./Enemy";

class Guy extends Enemy {
    constructor () {
        super('./guy.glb', 0.25);
    }
}

export default Guy;

import Enemy from "./Enemy";

class Guy extends Enemy {
    constructor () {
        super();
        this.scale = 0.25;
        this.modelFileLocation = './guy.glb';
    }
}

export default Guy;

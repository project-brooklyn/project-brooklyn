import Enemy from "./Enemy";

class Flag extends Enemy {
    constructor (scale) {
        super(scale);
        this.modelFileLocation = './flag.glb';
    }
}

export default Flag;

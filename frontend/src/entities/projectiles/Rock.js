import Projectile from "./Projectile";

export default class Rock extends Projectile {
    constructor (x, y, z, path) {
        super(x, y, z, 0.005, path);
        this.name = "rock";        
    };

};

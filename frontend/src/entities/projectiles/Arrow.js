import Projectile from "./Projectile";

export default class Arrow extends Projectile {
    constructor (x, y, z, path) {
        super(x, y, z, 0.01, path);
        this.name = "arrow";        
    };


};

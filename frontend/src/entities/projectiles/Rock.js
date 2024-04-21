import Projectile from "./Projectile";

export default class Rock extends Projectile {
    constructor (x, y, z, path) {
        const scale = 0.005;
        const rotation = [0.0, 0.0, 0.0];
        super(x, y, z, scale, rotation, path);
        this.name = "rock";
    };

};

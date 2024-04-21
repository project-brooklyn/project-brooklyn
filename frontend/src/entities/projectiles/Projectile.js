import Entity from "../Entity"; 

export default class Projectile extends Entity {
    constructor (x, y, z, scale, rotation, path) {
        super(x, y, z, scale, rotation);
        this.path = path;

        this.hp = Infinity;
    }

    getMoveFunction = () => {
        this.stepIndex = 0;

        return () => {
            if (this.stepIndex >= this.path.length) {
                this.hp = 0;
                return;
            }

            this.setPosition(...this.path[this.stepIndex]);
            this.stepIndex++;
        }
    };
};

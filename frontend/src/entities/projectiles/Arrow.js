import Projectile from "./Projectile";

export default class Arrow extends Projectile {
    constructor (x, y, z, path) {
        super(x, y, z, 0.01, path);
        this.name = "arrow";        
    };

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

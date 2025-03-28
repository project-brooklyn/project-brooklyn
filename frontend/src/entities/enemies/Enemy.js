import Entity from "../Entity";
import { FROZEN } from "../statuses";

export default class Enemy extends Entity {
    constructor(x, y, z, scale) {
        super(x, y, z, scale);
        this.statuses = new Set();
    }

    getMoveFunction = (steps) => {
        this.stepIndex = 1;

        return () => {
            if (this.cantMove || this.statuses.has(FROZEN)) return;
            const curr = steps[this.stepIndex - 1];
            const next = steps[this.stepIndex];

            this.rotation = [
                0, // based on model position, not render coordinates
                next[0] > curr[0] ? Math.PI / 2 :
                    next[0] < curr[0] ? 3 * Math.PI / 2 :
                        next[1] < curr[1] ? Math.PI :
                            next[1] > curr[1] ? 0 :
                                this.rotation[1], // keep current rotation
                0,
            ];

            this.setPosition(...next);

            if (this.stepIndex < steps.length - 1) {
                this.stepIndex++;
            } else {
                // enemy reaching base
                // is handled in GameCanvas
            }
        }
    }
}

import Entity from "../Entity";
import { FROZEN } from "../statuses";

export default class Enemy extends Entity {
    constructor(x, y, z, scale) {
        super(x, y, z, scale);
        this.statuses = new Set();
    }

    getMoveFunction = (path) => {
        this.path = path;
        this.pathIndex = 1;

        return () => {
            if (this.cantMove || this.statuses.has(FROZEN)) return;
            const last = path[this.pathIndex - 1];
            const curr = path[this.pathIndex];

            this.rotation = [
                0, // based on model position, not render coordinates
                curr[0] > last[0] ? Math.PI / 2 :
                    curr[0] < last[0] ? 3 * Math.PI / 2 :
                        curr[1] < last[1] ? Math.PI :
                            curr[1] > last[1] ? 0 :
                                this.rotation[1], // keep current rotation
                0,
            ];

            this.setPosition(...curr);

            if (this.pathIndex < path.length - 1) {
                this.pathIndex++;
            }
        }
    }

    getFutureLocation = (travelTime) => {
        const index = this.pathIndex + travelTime;
        if (index >= this.path.length) {
            return null;
        }
        return this.path[index];
    }
}

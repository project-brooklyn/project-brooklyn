class Entity {
    constructor(x, y, z, scale=1.0, rotation=[0.0, 0.0, 0.0]) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.position = [this.x, this.y, this.z];
        this.lastPosition = [x, y, z];
        this.scale = scale;
        this.rotation = rotation;

        this.spawnedAt = new Date().getTime();
    }

    setPosition(x,y,z) {
        this.lastPosition = [...this.position];
        this.x = x;
        this.y = y;
        this.z = z;
        this.position = [x, y, z];
    }

    getMoveFunction = (steps) => {
        this.stepIndex = 1;
        
        return () => {
            const curr = steps[this.stepIndex-1];
            const next = steps[this.stepIndex];

            this.rotation = [
                0, // based on model position, not render coordinates
                next[0] > curr[0] ? Math.PI/2 :
                next[0] < curr[0] ? 3*Math.PI/2 :
                next[1] < curr[1] ? Math.PI :
                next[1] > curr[1] ? 0 :
                this.rotation[1], // keep current rotation 
                0,
            ];

            this.setPosition(...next);

            if (this.stepIndex<steps.length-1) {
                this.stepIndex++;
            } else {
                // enemy attacks the base

                // simple remove model
                this.hp=0; 
            }
        }
    }
}

export default Entity;

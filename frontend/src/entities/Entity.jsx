class Entity {
    constructor(x, y, z, scale=1.0) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.position = [this.x, this.y, this.z];
        this.lastPosition = [x, y, z];
        this.scale = scale;

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
            this.setPosition(...steps[this.stepIndex]);

            if (this.stepIndex<steps.length-1) {
                this.stepIndex++;
            } else {
                // enemy attacks the base
                this.hp=0; // simple remove model
            }
        }
    }
}

export default Entity;

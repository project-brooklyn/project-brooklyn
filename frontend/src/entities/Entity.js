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
    };

    setPosition(x,y,z) {
        this.lastPosition = [...this.position];
        this.x = x;
        this.y = y;
        this.z = z;
        this.position = [x, y, z];
    };

};

export default Entity;

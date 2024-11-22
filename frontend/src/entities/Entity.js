import * as THREE from 'three';

class Entity {
    constructor(x, y, z, scale=1.0, quaternion=new THREE.Quaternion()) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.position = [this.x, this.y, this.z];
        this.rotation = [0,0,0];
        this.lastPosition = [x, y, z];
        this.scale = scale;
        this.quaternion = quaternion;

        this.spawnedAt = new Date().getTime();
    }

    setPosition(x,y,z) {
        this.lastPosition = [...this.position];
        this.x = x;
        this.y = y;
        this.z = z;
        this.position = [x, y, z];
    }

}

export default Entity;

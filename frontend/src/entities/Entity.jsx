import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

class Entity {
    constructor(modelFileLocation, x, y, z, scale=1.0, rotation=0.0) {
        this.modelFileLocation = modelFileLocation;

        this.x = x;
        this.y = y;
        this.z = z;
        this.position = [x, y, z];
        this.scale = scale;
        this.rotation = {x: 0, y: rotation, z: 0};

        this.spawnedAt = new Date().getTime();

        // replaced by objectToComponent
        // clone the gltf.scene so that it can be rendered multiple times
        this.gltf = useLoader(GLTFLoader, this.modelFileLocation);
        this.scene = this.gltf.scene.clone(true);
        this.scene.position.set(x, y/10, z); // divide y by 10 or tileHeight
        this.scene.rotation.set(0.0, rotation, 0.0);
        this.scene.scale.set(scale, scale, scale);
    }

    // replaced by objectToComponent
    fiberComponent = (i) => {
        if (!this.gltf) return null;
        return <primitive object={this.scene} key={i}/>;
    }

    getMoveFunction = (steps) => {
        this.stepIndex = 1;
        
        return () => {
            const curr = steps[this.stepIndex-1];
            const next = steps[this.stepIndex];

            // rotation
            if (curr[0]<next[0]) this.rotation.y = Math.PI/2;
            if (curr[0]>next[0]) this.rotation.y = 3*Math.PI/2;
            if (curr[1]<next[1]) this.rotation.y = 0;
            if (curr[1]>next[1]) this.rotation.y = Math.PI;

            // translation
            this.x = next[0];
            this.y = next[1] + 0.125;
            this.z = next[2];

            if (this.stepIndex<steps.length-1) {
                this.stepIndex++;
            } else { // simple remove model
                this.hp=0;
            }
        }
    }
}

export default Entity;

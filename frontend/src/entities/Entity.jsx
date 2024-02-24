import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

class Entity {
    constructor(modelFileLocation, x, y, z, scale=1.0, rotation=0.0) {
        this.modelFileLocation = modelFileLocation;
        this.x = x;
        this.y = y;
        this.z = z;
        this.scale = scale;
        this.rotation = rotation;
    }

    fiberComponent = () => {
        const gltf = useLoader(GLTFLoader, this.modelFileLocation);
        if (!gltf) return null;

        gltf.scene.position.set(this.x, this.y/10, this.z); // divide y by 10 or tileHeight
        gltf.scene.rotation.set(0, this.rotation, 0);
        gltf.scene.scale.set(this.scale, this.scale, this.scale);

        // clone the gltf.scene so that it can be rendered multiple times
        return <primitive object={gltf.scene.clone(true)} key={`${this.x},${this.y},${this.z}`}/>;
    }
}

export default Entity;

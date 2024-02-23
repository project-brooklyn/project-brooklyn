import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

export default function Castle() {
    const gltf = useLoader(GLTFLoader, "/castle_3d_model.glb");

    if (!gltf) {
        return null;
    }

    gltf.scene.position.set(0, 0.1, 0); // Set position x,y,z (y is height)
    gltf.scene.rotation.set(0, 0, 0); // Set rotation around x,y,z axes
    gltf.scene.scale.set(0.005, 0.005, 0.005); // Set scale x,y,z

    return <primitive object={gltf.scene} />;
}

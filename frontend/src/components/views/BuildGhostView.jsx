import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { convertToRenderCoordinates, modelFiles } from "../../utils/render_utils";
import { useLoader } from "@react-three/fiber";

export default function BuildGhostView({ structure }) {
    const { scale, name, hp, maxHp, offset } = structure;
    if (!hp) return null;
    const coordinates = convertToRenderCoordinates(structure, offset);

    const gltf = useLoader(GLTFLoader, modelFiles[name]);
    gltf.scene.traverse((child) => {
        if (child.isMesh) {
            child.material = child.material.clone();
            child.material.transparent = true;
            child.material.opacity = 0.25;
        }
    });

    const key = name + coordinates.x + coordinates.y + coordinates.z;
    return (<group position={[coordinates.x, coordinates.y, coordinates.z]} key={key}>
        <primitive
            object={gltf.scene.clone(true)}
            scale={scale}
        />
    </group>);
};

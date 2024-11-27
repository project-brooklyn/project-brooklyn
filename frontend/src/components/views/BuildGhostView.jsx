import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { convertToRenderCoordinates, modelFiles } from "../../utils/render_utils";
import { useLoader } from "@react-three/fiber";

export default function BuildGhostView({ structure }) {
    const { scale, name, offset } = structure;
    const coordinates = convertToRenderCoordinates(structure, offset);

    const gltf = useLoader(GLTFLoader, modelFiles[name]);
    gltf.scene.traverse((child) => {
        if (child.isMesh) {
            child.material = child.material.clone();
            child.material.transparent = true;
            child.material.opacity = 0.5;
        }
    });

    const key = name + coordinates.x + coordinates.y + coordinates.z;
    return (<>
        <group position={[coordinates.x, coordinates.y, coordinates.z]} key={key}>
            <primitive
                object={gltf.scene.clone(true)}
                scale={scale}
            />
        </group>
        <RangeIndicator structure={structure} />
    </>);
}

const RangeIndicator = ({structure}) => {
    const {minRange, maxRange} = structure;
    const coordinates = convertToRenderCoordinates(structure, {x: 0, y: 0, z: -0.75}); // center on top of tower
    return (<group position={[coordinates.x, coordinates.y, coordinates.z]}>
        <mesh>
            <sphereGeometry args={[maxRange, 32, 32]} />
            <meshBasicMaterial
                color="blue" 
                transparent={true}
                opacity={0.25} 
                depthTest={true} 
                depthWrite={false}
            />
        </mesh>
        <mesh>
            <sphereGeometry args={[minRange, 32, 32]} />
            <meshBasicMaterial 
                color="white" 
                transparent={true}
                opacity={0.1} 
                depthWrite={false}
                depthTest={true} 
            />
        </mesh>
    </group>)
}

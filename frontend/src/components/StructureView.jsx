import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { convertToRenderCoordinates, modelFiles } from "../utils/render_utils";
import { useLoader } from "@react-three/fiber";
import HpView from "./HpView";

const renderStructure = (structure) => {
    const { scale, name, hp, maxHp, offset } = structure;
    if (!hp) return null;
    const coordinates = convertToRenderCoordinates(structure, offset);

    const modelFile = modelFiles[name];
    const isObjModel = modelFile.slice(-3) === 'obj';
    
    const modelLoader = useLoader(!isObj ? GLTFLoader : OBJLoader, modelFile)
    const key = name + coordinates.x + coordinates.y + coordinates.z;
    return (
        <group position={[coordinates.x, coordinates.y, coordinates.z]} >
            {hp && hp !== Infinity && <HpView hpFraction={hp / maxHp} position={[0, 0.5, 0]} width={1.0} />}
            <primitive
                key={key}
                object={isObj ? gltf : gltf.scene.clone(true)}
                scale={scale}
            />
        </group>
    );
};

export default function StructureView({ structures }) {
    const structureComponents = structures.map(renderStructure);
    return <>
        {structureComponents}
    </>
};

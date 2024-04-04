import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { convertToRenderCoordinates, modelFiles } from "../utils/render_utils";
import { useLoader } from "@react-three/fiber";

const renderStructure = (structure) => {
    const { scale, name, hp, offset } = structure;
    if (!hp) return null;
    const coordinates = convertToRenderCoordinates(structure, offset);

    const gltf = useLoader(GLTFLoader, modelFiles[name]);
    return (<primitive
        key={name+coordinates.x+coordinates.y+coordinates.z}
        object={gltf.scene.clone(true)}
        scale={scale}
        position={[coordinates.x, coordinates.y, coordinates.z]}
    />);
};

export default function StructureView({structures}) {
    const structureComponents = structures.map(renderStructure);
    return <>
        {structureComponents}
    </>
};

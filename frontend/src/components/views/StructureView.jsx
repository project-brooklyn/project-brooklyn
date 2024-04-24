import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { convertToRenderCoordinates, modelFiles } from "../../utils/render_utils";
import { useLoader } from "@react-three/fiber";
import HpView from "./HpView";

const renderStructure = (structure) => {
    const { scale, name, hp, maxHp, offset, disabled } = structure;
    if (!hp || disabled) return null;
    const coordinates = convertToRenderCoordinates(structure, offset);

    const gltf = useLoader(GLTFLoader, modelFiles[name]);
    const key = name + coordinates.x + coordinates.y + coordinates.z;
    return (<group position={[coordinates.x, coordinates.y, coordinates.z]} key={key}>
        {hp && hp !== Infinity && <HpView hpFraction={hp / maxHp} position={[0, 0.5, 0]} width={1.0} />}
        <primitive
            object={gltf.scene.clone(true)}
            scale={scale}
        />
    </group>);
};

export default function StructureView({ structures }) {
    const structureComponents = structures.map(renderStructure);
    return <>
        {structureComponents}
    </>
};

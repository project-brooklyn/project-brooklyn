import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { centerObjModel, convertToRenderCoordinates, modelFiles } from "../../utils/render_utils";
import { useLoader } from "@react-three/fiber";
import HpView from "./HpView";
import { StatusView } from "./StatusView";

const NO_BUFFS = new Set();

const StructureRender = (assets, structure) => {
    const { scale, name, hp, maxHp, offset, rotation, height } = structure;
    const buffs = structure.getBuffs() || NO_BUFFS;
    const coordinates = convertToRenderCoordinates(structure, offset);
    const modelFile = modelFiles[name] || modelFiles.placeholder;
    const isObjModel = modelFile.slice(-3) === 'obj';
    const modelLoader = useLoader(isObjModel ? OBJLoader : GLTFLoader, modelFile)

    // prevent real towers from becoming transparent when ghost view is present
    if (!isObjModel) {
        modelLoader.scene.traverse((child) => {
            if (child.isMesh) {
                child.material = child.material.clone();
                child.material.transparent = true;
                child.material.opacity = 1;
                child.castShadow = true;
            }
        });
    }
    if (isObjModel) centerObjModel(modelLoader);
    const key = name + coordinates.x + coordinates.y + coordinates.z;
    return (
        <group position={[coordinates.x, coordinates.y, coordinates.z]} key={key}>
            {hp && hp !== Infinity && <HpView hpFraction={hp / maxHp} position={[0, 0.5, 0]} width={1.0} />}
            <StatusView assets={assets} position={[0, 0.5, 0]} statuses={buffs} height={height} />
            <primitive
                object={isObjModel ? modelLoader : modelLoader.scene.clone(true)}
                scale={scale}
                rotation={rotation}
            />
        </group >
    );
}

export default function StructureView({ assets, structures }) {
    const structureComponents = structures.filter(s => s.hp)
        .map((structure) => { return StructureRender(assets, structure) });
    return <>
        {structureComponents}
    </>
}

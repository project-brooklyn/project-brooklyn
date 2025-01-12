import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { convertToRenderCoordinates, modelFiles } from "../../utils/render_utils";
import { useLoader } from "@react-three/fiber";
import HpView from "./HpView";
import { StatusView } from "./StatusView";

const positionAboveEnemy = [0, 0.5, 0];
const enemyHeight = 2; // TODO: fix this if enemies have different heights

const EnemyRender = (enemy, i) => {
    const { scale, name, hp, maxHp, offset, rotation, statuses } = enemy;
    const gltf = useLoader(GLTFLoader, modelFiles[name] || modelFiles.placeholder);
    if (!hp) return null;
    const coordinates = convertToRenderCoordinates(enemy, offset);

    const position = [coordinates.x, coordinates.y, coordinates.z];
    return (<group position={position} key={name+i}>
        <HpView hpFraction={hp/maxHp} position={positionAboveEnemy} />
        <StatusView statuses={statuses} position={positionAboveEnemy} height={enemyHeight} />
        <primitive
            object={gltf.scene.clone(true)}
            scale={scale}
            rotation={rotation}
        />
    </group>);
}

export default function EnemyView({enemies}) {
    const enemyComponents = enemies.map((enemy, i) => EnemyRender(enemy, i));
    return <>
        {enemyComponents}
    </>
}

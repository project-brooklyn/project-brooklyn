import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { convertToRenderCoordinates, modelFiles } from "../../utils/render_utils";
import { render, useLoader } from "@react-three/fiber";
import HpView from "./HpView";

const renderEnemy = (enemy, i) => {
    const { scale, name, hp, maxHp, offset, spawnedAt, rotation } = enemy;
    if (!hp) return null;
    const coordinates = convertToRenderCoordinates(enemy, offset);

    const gltf = useLoader(GLTFLoader, modelFiles[name]);
    const position = [coordinates.x, coordinates.y, coordinates.z];
    return (<group position={position} key={name+i}>
        <HpView hpFraction={hp/maxHp} position={[0, 0.5, 0]} />
        <primitive
            object={gltf.scene.clone(true)}
            scale={scale}
            rotation={rotation}
        />
    </group>);
}

export default function EnemyView({enemies}) {
    const enemyComponents = enemies.map((enemy, i) => renderEnemy(enemy, i));
    return <>
        {enemyComponents}
    </>
}

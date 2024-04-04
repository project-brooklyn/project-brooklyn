import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { convertToRenderCoordinates, modelFiles } from "../utils/render_utils";
import { useLoader } from "@react-three/fiber";

const renderEnemy = (enemy) => {
    const { scale, name, hp, offset, spawnedAt, rotation } = enemy;
    if (!hp) return null;
    const coordinates = convertToRenderCoordinates(enemy, offset);

    const gltf = useLoader(GLTFLoader, modelFiles[name]);
    return (<primitive
        key={name+spawnedAt}
        object={gltf.scene.clone(true)}
        scale={scale}
        position={[coordinates.x, coordinates.y, coordinates.z]}
        rotation={rotation}
    />);
}

export default function EnemyView({enemies}) {
    const enemyComponents = enemies.map(renderEnemy)
    return <>
        {enemyComponents}
    </>
}

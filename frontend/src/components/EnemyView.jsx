import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { convertToRenderCoordinates, modelFiles } from "../utils/render_utils";
import { useLoader } from "@react-three/fiber";

const renderEnemy = (enemy) => {
    const { scale, name, hp, offset, spawnedAt, position, lastPosition } = enemy;
    if (!hp) return null;
    const coordinates = convertToRenderCoordinates(enemy, offset);
    const rotation = [
        0, // based on model position, not render coordinates
        position[0] > lastPosition[0] ? Math.PI/2 :
        position[0] < lastPosition[0] ? 3*Math.PI/2 :
        position[1] < lastPosition[1] ? Math.PI :
        0, // guy faces +z by default (future bug with climbing)
        0, // check for each new model
    ]

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

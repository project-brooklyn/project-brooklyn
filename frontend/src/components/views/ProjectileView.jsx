import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { convertToRenderCoordinates, modelFiles } from "../../utils/render_utils";
import { useLoader } from "@react-three/fiber";
import { Line } from '@react-three/drei';

const renderLaser = (laser, _gltf) => {
    const { path } = laser;
    const points = [path[1], path[path.length - 1]] // start path at 1 to render laser outside tower
        .map((point) => {
            const [x, y, z] = point;
            return convertToRenderCoordinates({ x, y, z });
        })
    return (<Line
        key={projectileKey(laser)}
        points={points} color="red" lineWidth={2}
    />)
}

const renderSpikes = (spikes, gltf) => {
    const { quaternion, scale } = spikes;
    const ARRAY_OFFSET = 0.2;
    const spikesArray = [];
    for (let x = -ARRAY_OFFSET; x <= ARRAY_OFFSET; x += ARRAY_OFFSET) {
        for (let y = -ARRAY_OFFSET; y <= ARRAY_OFFSET; y += ARRAY_OFFSET) {
            const coordinates = convertToRenderCoordinates(spikes, { x, y: y - 0.02, z: -0.3 });
            spikesArray.push(coordinates);
        }
    }

    return (<group key={projectileKey(spikes)}>
        {spikesArray.map((coordinates) => {
            return <primitive
                key={`${projectileKey(spikes)},${coordinates.x},${coordinates.y},${coordinates.z}`}
                object={gltf.scene.clone(true)}
                scale={scale}
                position={[coordinates.x, coordinates.y, coordinates.z]}
                quaternion={quaternion}
            />
        })}
    </group>)
}

const SPECIAL_PROJECTILES = {
    laser: renderLaser,
    spikes: renderSpikes,
}

const projectileKey = (projectile) => {
    const { name, spawnedAt, position, target } = projectile;
    return `${name},${spawnedAt},${position},${target?.position || ''}`;
}

const ProjectileRender = (projectile) => {
    const { name, offset, quaternion, scale, hp, target } = projectile;
    const gltf = useLoader(GLTFLoader, modelFiles[name] || modelFiles.placeholder);

    if (hp <= 0) return null; // allows lasers to disappear
    if (target && !target.hp) return null; // despawn projectiles with dead targets
    if (name in SPECIAL_PROJECTILES) return SPECIAL_PROJECTILES[name](projectile, gltf);

    const coordinates = convertToRenderCoordinates(projectile, offset);

    return (<primitive
        key={projectileKey(projectile)}
        object={gltf.scene.clone(true)}
        scale={scale}
        position={[coordinates.x, coordinates.y, coordinates.z]}
        quaternion={quaternion}
    />)
}

export default function ProjectileView({ projectiles }) {
    const projectileComponents = projectiles.map(ProjectileRender);
    return <>
        {projectileComponents}
    </>
}

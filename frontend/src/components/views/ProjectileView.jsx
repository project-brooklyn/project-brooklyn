import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { convertToRenderCoordinates, modelFiles } from "../../utils/render_utils";
import { useLoader } from "@react-three/fiber";
import { Line } from '@react-three/drei';

const ProjectileRender = (projectile) => {
    const { name, offset, spawnedAt, quaternion, scale, hp } = projectile;
    const gltf = useLoader(GLTFLoader, modelFiles[name] || modelFiles.placeholder);

    if (hp <= 0) return null; // allows lasers to disappear
    if (name==='laser') return renderLaser(projectile); // TODO: clean this up if adding more projectiles
    if (name==='spikes') return renderSpikes(projectile, gltf);
    
    const coordinates = convertToRenderCoordinates(projectile, offset);

    return (<primitive
        key={name+spawnedAt+projectile.position}
        object={gltf.scene.clone(true)}
        scale={scale}
        position={[coordinates.x, coordinates.y, coordinates.z]}
        quaternion={quaternion}
    />)
}

const renderLaser = (laser) => {
    const { path, spawnedAt } = laser;
    const points = [path[1], path[path.length-1]] // start path at 1 to render laser outside tower
        .map((point) => {
            const [x, y, z] = point;
            return convertToRenderCoordinates({x, y, z});
        })
    return (<Line 
        key={`${spawnedAt},${path[0][0]},${path[0][1]},${path[0][2]}`} 
        points={points} color="red" lineWidth={2} 
    />)
}

const renderSpikes = (spikes, gltf) => {
    const { spawnedAt, position, quaternion, scale } = spikes;
    const ARRAY_OFFSET = 0.2;
    const spikesArray = [];
    for (let x = -ARRAY_OFFSET; x <= ARRAY_OFFSET; x+=ARRAY_OFFSET) {
        for (let y = -ARRAY_OFFSET; y <= ARRAY_OFFSET; y+=ARRAY_OFFSET) {
            const coordinates = convertToRenderCoordinates(spikes, {x, y: y - 0.02, z: -0.3});
            spikesArray.push(coordinates);
        }
    }

    return (<group key={position}>
        {spikesArray.map((coordinates) => {
            return <primitive
                key={`spikes${spawnedAt},${coordinates.x},${coordinates.y},${coordinates.z}`}
                object={gltf.scene.clone(true)}
                scale={scale}
                position={[coordinates.x, coordinates.y, coordinates.z]}
                quaternion={quaternion}
            />
        })}
    </group>)
}

export default function ProjectileView({projectiles}) {
    const projectileComponents = projectiles.map(ProjectileRender)
    return <>
        {projectileComponents}
    </>
}

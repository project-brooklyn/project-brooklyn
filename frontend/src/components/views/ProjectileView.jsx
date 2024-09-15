import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { convertToRenderCoordinates, modelFiles } from "../../utils/render_utils";
import { useLoader } from "@react-three/fiber";
import { Line } from '@react-three/drei';

const renderProjectile = (projectile) => {
    const { name, offset, spawnedAt, quaternion, scale, hp} = projectile;
    if (!hp) return null;
    if (name==='laser') return renderLaser(projectile); // TODO: clean this up if adding more projectiles

    const coordinates = convertToRenderCoordinates(projectile, offset);
    const gltf = useLoader(GLTFLoader, modelFiles[name]);

    return (<primitive
        key={name+spawnedAt+projectile.position}
        object={gltf.scene.clone(true)}
        scale={scale}
        position={[coordinates.x, coordinates.y, coordinates.z]}
        quaternion={quaternion}
    />);
};

const renderLaser = (laser) => {
    const { path, spawnedAt } = laser;
    const points = [path[0], path[path.length-1]]
        .map((point) => {
            const [x, y, z] = point;
            return convertToRenderCoordinates({x, y, z});
        });
    return (<Line 
        key={`${spawnedAt},${path[0][0]},${path[0][1]},${path[0][2]}`} 
        points={points} color="red" lineWidth={2} 
    />);
}

export default function ProjectileView({projectiles}) {
    const projectileComponents = projectiles.map(renderProjectile)
    return <>
        {projectileComponents}
    </>
};

import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { convertToRenderCoordinates, modelFiles } from "../../utils/render_utils";
import { useLoader } from "@react-three/fiber";

const renderProjectile = (projectile) => {
    const { name, offset, spawnedAt, quaternion, scale, hp} = projectile;
    const coordinates = convertToRenderCoordinates(projectile, offset);
    const gltf = useLoader(GLTFLoader, modelFiles[name]);

    if (!hp) return null;
    return (<primitive
        key={name+spawnedAt+projectile.position}
        object={gltf.scene.clone(true)}
        scale={scale}
        position={[coordinates.x, coordinates.y, coordinates.z]}
        quaternion={quaternion}
    />);
};

export default function ProjectileView({projectiles}) {
    const projectileComponents = projectiles.map(renderProjectile)
    return <>
        {projectileComponents}
    </>
};

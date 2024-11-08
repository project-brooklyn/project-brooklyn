import { useLoader } from "@react-three/fiber";
import { convertToRenderCoordinates } from "../../utils/render_utils";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

const renderFlag = (flag) => {
    const coordinates = convertToRenderCoordinates({x: flag[0], y: flag[1], z: flag[2]});
    const gltf = useLoader(GLTFLoader, './basic/flag.glb');

    return <primitive
        key={flag.join(',')}
        object={gltf.scene.clone(true)}
        scale={[0.01, 0.01, 0.01]}
        position={[coordinates.x, coordinates.y, coordinates.z]}
        rotation={[0, 3*Math.PI/4, 0]}
    />
}

export default function PathView({ path }) {
    const flagComponents = path.map(renderFlag);
    return <>
        {flagComponents}
    </>
}

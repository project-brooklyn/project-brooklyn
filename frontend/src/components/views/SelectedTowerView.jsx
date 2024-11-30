import { Cone } from '@react-three/drei';
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { convertToRenderCoordinates, modelFiles } from "../../utils/render_utils";
import { useLoader } from "@react-three/fiber";
import { Status } from "../../entities/towers/Tower";

export default function SelectedTowerView({ selectedTower }) {
    const { scale, name, offset, status } = selectedTower;
    const coordinates = convertToRenderCoordinates(selectedTower, offset);

    if (status === Status.BUILT) {
        return <SelectedTowerIndicatorView coordinates={coordinates} />
    } else if (status === Status.PENDING) {
        return <GhostTowerView name={name} coordinates={coordinates} scale={scale} />;
    } else {
        console.error("Error with Selected Tower: ", selectedTower);
        return null;
    }

}

const GhostTowerView = ({ name, coordinates, scale }) => {
    const gltf = useLoader(GLTFLoader, modelFiles[name]);
    gltf.scene.traverse((child) => {
        if (child.isMesh) {
            child.material = child.material.clone();
            child.material.transparent = true;
            child.material.opacity = 0.5;
        }
    });

    const key = name + coordinates.x + coordinates.y + coordinates.z;
    return (<group position={[coordinates.x, coordinates.y, coordinates.z]} key={key}>
        <primitive
            object={gltf.scene.clone(true)}
            scale={scale}
        />
    </group>);
}

const SelectedTowerIndicatorView = ({ coordinates }) => {
    const RADIUS = 0.2;
    const HEIGHT = 0.4;
    const RADIAL_SEGMENTS = 6;

    return <Cone
        args={[RADIUS, HEIGHT, RADIAL_SEGMENTS]}
        position={[coordinates.x, coordinates.y + 1.25, coordinates.z]}
        rotation={[0, 0, Math.PI]}
    >
        <meshBasicMaterial color="red" />
    </Cone>

}

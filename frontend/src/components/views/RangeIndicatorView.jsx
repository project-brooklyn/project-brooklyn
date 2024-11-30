import { convertToRenderCoordinates } from "../../utils/render_utils";

export const RangeIndicatorView = ({ tower }) => {
    const { minRange, maxRange } = tower;
    const coordinates = convertToRenderCoordinates(tower, {x: 0, y: 0, z: -0.75}); // center on top of tower
    return (<group position={[coordinates.x, coordinates.y, coordinates.z]}>
        <mesh>
            <sphereGeometry args={[maxRange, 32, 32]} />
            <meshBasicMaterial
                color="blue" 
                transparent={true}
                opacity={0.25} 
                depthTest={true} 
                depthWrite={false}
            />
        </mesh>
        <mesh>
            <sphereGeometry args={[minRange, 32, 32]} />
            <meshBasicMaterial 
                color="white" 
                transparent={true}
                opacity={0.1} 
                depthWrite={false}
                depthTest={true} 
            />
        </mesh>
    </group>)
}

import * as THREE from "three";
import { round } from '../../utils/math_utils';
import { convertToRenderCoordinates } from '../../utils/render_utils';

const SQUARE_SIZE = 1 / 3;

const RANGE_GEOMETRY = new THREE.PlaneGeometry(SQUARE_SIZE, SQUARE_SIZE);
const RANGE_MATERIAL = new THREE.MeshBasicMaterial({
    color: "darkred",
    transparent: true,
    opacity: 0.9,
})

export const RangeIndicatorView = ({ tower, gameMap }) => {
    const EXAMPLE_TRAVEL_TIME = 25;
    const aboveTileOffset = -0.01;

    let tiles = [];
    for (let x = -SQUARE_SIZE; x < gameMap.width - SQUARE_SIZE; x += SQUARE_SIZE) {
        for (let y = -SQUARE_SIZE; y < gameMap.depth - SQUARE_SIZE; y += SQUARE_SIZE) {
            const z = gameMap.getElevation(round(x, 0), round(y, 0), false);
            if (
                !(tower.damage || tower.appliedStatus) || // tower has no attack
                !tower.getProjectilePath([x, y, z], gameMap, EXAMPLE_TRAVEL_TIME) // tower can't hit tile
            ) continue;

            const coordinates = convertToRenderCoordinates({ x, y, z }, { x: 0, y: 0, z: aboveTileOffset });
            tiles.push(coordinates);
        }
    }

    return (
        <>
            {tiles.map((coordinates) => (
                <mesh
                    geometry={RANGE_GEOMETRY}
                    material={RANGE_MATERIAL}
                    position={[coordinates.x, coordinates.y, coordinates.z]}
                    rotation={[-Math.PI / 2, 0, 0]}
                    key={`${coordinates.x},${coordinates.z}`}
                >
                </mesh>
            ))}
        </>
    );
};

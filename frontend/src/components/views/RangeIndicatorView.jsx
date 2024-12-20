import { Status } from '../../entities/towers/Tower';
import { round } from '../../utils/math_utils';
import { convertToRenderCoordinates, tileConfig } from '../../utils/render_utils';

export const RangeIndicatorView = ({ tower, gameMap }) => {
    const SQUARE_SIZE = 1/3;
    const aboveTileOffset = -0.01;
    const onTopOfTower = tower.name === 'spikeTower' && tower.status === Status.PLANNING;
    const heightOffset = onTopOfTower ? -tower.height * tileConfig.height : 0;

    let tiles = [];
    for (let x = -SQUARE_SIZE; x < gameMap.width-SQUARE_SIZE; x += SQUARE_SIZE) {
        for (let y = -SQUARE_SIZE; y < gameMap.depth-SQUARE_SIZE; y += SQUARE_SIZE) {
            const z = gameMap.getElevation(round(x, 0), round(y, 0), true);
            if (!tower.canHit([x, y, z], gameMap)) continue;

            const coordinates = convertToRenderCoordinates({ x, y, z }, {x: 0, y: 0, z: aboveTileOffset + heightOffset});
            tiles.push(coordinates);
        }
    }

    return (
        <>
            {tiles.map((coordinates) => (
                <mesh
                    position={[coordinates.x, coordinates.y, coordinates.z]}
                    rotation={[-Math.PI / 2, 0, 0]}
                    key={`${coordinates.x},${coordinates.z}`}
                >
                    <planeGeometry args={[SQUARE_SIZE, SQUARE_SIZE]} />
                    <meshBasicMaterial color="red" transparent opacity={0.5} />
                </mesh>
            ))}
        </>
    );
};

import { pythagorean, round } from '../../utils/math_utils';
import { convertToRenderCoordinates, tileConfig } from '../../utils/render_utils';

export const RangeIndicatorView = ({ tower, gameMap }) => {
    const { minRange, maxRange } = tower;
    const SQUARE_SIZE = 1/3;

    let tiles = [];
    for (let x = -SQUARE_SIZE; x < gameMap.width-SQUARE_SIZE; x += SQUARE_SIZE) {
        for (let y = -SQUARE_SIZE; y < gameMap.depth-SQUARE_SIZE; y += SQUARE_SIZE) {
            const z = gameMap.getElevation(round(x, 0), round(y, 0), true);
            const distance = pythagorean([tower.x, tower.y], [x, y]);

            if (distance < minRange) continue;
            if (distance > maxRange) continue;
            if (!tower.canHit([x, y, z], gameMap)) continue;

            const coordinates = convertToRenderCoordinates({ x, y, z }, {x: 0, y: 0, z: -0.1});
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

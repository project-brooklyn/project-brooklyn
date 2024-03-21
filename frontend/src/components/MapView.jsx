import { convertToRenderCoordinates, tileConfig } from "../utils/render_utils";

function renderTile(tile) {
    const position = convertToRenderCoordinates(tile)
    const spacer = 0.00; // add space between tiles to see better, remove after improved textures

    return (
                                                // place tiles below other objects
        <mesh position={ [position.x, position.y - tileConfig.height/2, position.z] } key={`${tile.x},${tile.y},${tile.z}`}>
            <boxGeometry args={ [tileConfig.width*(1-spacer), tileConfig.height*(1-spacer), tileConfig.width*(1-spacer)] } />
            <meshBasicMaterial
                color={ tile.type.material.color }
            />
        </mesh>
    )
};

export default function MapView({gameMap})
{
    const tilesMeshes = gameMap.mapData.map(renderTile)

    return <>
        {tilesMeshes}
    </>
}

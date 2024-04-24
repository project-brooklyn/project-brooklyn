import { convertToRenderCoordinates, tileConfig } from "../../utils/render_utils";


export default function MapView({gameMap, buildTower})
{
    function renderTile(tile) {
        const position = convertToRenderCoordinates(tile)
        const spacer = 0.00; // add space between tiles to see better, remove after improved textures
    
        return (
            <mesh
                // reduce position.y so that tiles render below other objects
                position={ [position.x, position.y - tileConfig.height/2, position.z] }
                key={`${tile.x},${tile.y},${tile.z}`}
                onClick={(e) => {
                    // tricky bug: prevent click from going through entity, make sure it only triggers on tile closest to camera
                    e.stopPropagation();
                    buildTower(tile.x, tile.z, tile.y);
                }}
            >
                <boxGeometry args={ [tileConfig.width*(1-spacer), tileConfig.height*(1-spacer), tileConfig.width*(1-spacer)] } />
                <meshBasicMaterial
                    color={ tile.type.material.color }
                />
            </mesh>
        )
    };

    const tilesMeshes = gameMap.mapData.map(renderTile)

    return <>
        {tilesMeshes}
    </>
};

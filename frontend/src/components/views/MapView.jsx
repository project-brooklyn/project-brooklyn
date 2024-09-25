import { convertToRenderCoordinates, tileConfig } from "../../utils/render_utils";

export default function MapView({assets, gameMap, mouseInput})
{
    function renderTile(tile, _coordinates) {
        const position = convertToRenderCoordinates(tile)
        const geometry = assets.geometryManager.get("tile");
        const material = assets.materialManager.get(tile.type.name);

        return (
            <mesh
                // reduce position.y so that tiles render below other objects
                position={ [position.x, position.y - tileConfig.height/2, position.z] }
                geometry={geometry}
                material={material}
                key={`${tile.x},${tile.y},${tile.z}`}
                onClick={(e) => {
                    mouseInput.triggerClick(tile.x, tile.y, tile.z);
                }}
                onPointerEnter={(e) => {
                    mouseInput.triggerHover(tile.x, tile.y, tile.z);
                }}
            >
            </mesh>
        )
    }

    const tilesMeshes = gameMap.forEachTile(renderTile);

    return <>
        {tilesMeshes}
    </>
}

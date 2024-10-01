import { tileKey } from '/src/map/GameMap.js';
import { convertToRenderCoordinates, tileConfig } from "../../utils/render_utils";

export default function MapView({assets, gameMap, overrides, mouseInput})
{
    function renderTile(tile, reactive = true) {
        const tkey = tileKey(tile.x, tile.y, tile.z)
        if (overrides.get("HIDE") === tkey) {
            return null;
        }

        const position = convertToRenderCoordinates(tile)
        const geometry = assets.geometryManager.get("tile");
        const material = assets.materialManager.get(tile.type.name);

        let onClick = null;
        let onPointerEnter = null;
        if (reactive) {
            onClick = (e) => {
                mouseInput.triggerClick(tile.x, tile.y, tile.z);
            };
            onPointerEnter = (e) => {
                mouseInput.triggerHover(tile.x, tile.y, tile.z);
            };
        }

        return (
            <mesh
                // reduce position.y so that tiles render below other objects
                position={ [position.x, position.y - tileConfig.height/2, position.z] }
                geometry={geometry}
                material={material}
                key={`${tile.x},${tile.y},${tile.z}`}
                onClick={onClick}
                onPointerEnter={onPointerEnter}
            >
            </mesh>
        )
    }

    const tileMeshes = gameMap.forEachTile(renderTile);
    if (overrides.has("SHOW")) {
        tileMeshes.push(renderTile(overrides.get("SHOW"), false));
    }

    return <>
        {tileMeshes}
    </>
}

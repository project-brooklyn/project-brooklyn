import { tileKey } from '/src/map/GameMap.js';
import { convertToRenderCoordinates, tileConfig } from "../../utils/render_utils";

export default function MapView({ assets, gameMap, overrides, mouseInput }) {
    function renderTile(tile, reactive = true) {
        const tkey = tileKey(tile.x, tile.y, tile.z)

        const position = convertToRenderCoordinates(tile)
        const geometry = assets.geometryManager.get("tile");

        let material = assets.materialManager.get(tile.type.name);
        if (overrides.get("HIDE") === tkey) {
            // Adjust material opacity
            material = material.clone();
            material.opacity = 0.5;
            material.transparent = true;
        }

        let onClick = null;
        let onPointerEnter = null;
        if (reactive) {
            onClick = (e) => {
                e.stopPropagation();
                mouseInput.triggerClick(tile.x, tile.y, tile.z);
            };
            onPointerEnter = (e) => {
                e.stopPropagation();
                mouseInput.triggerHover(tile.x, tile.y, tile.z);
            };
        } else {
            // Make preview for new tiles semi-transparent
            material = material.clone();
            material.opacity = 0.75;
            material.transparent = true;
        }

        return (
            <mesh
                // reduce position.y so that tiles render below other objects
                position={[position.x, position.y - tileConfig.height / 2, position.z]}
                geometry={geometry}
                material={material}
                key={`${tile.x},${tile.y},${tile.z},${reactive}`}
                onClick={onClick}
                onPointerEnter={onPointerEnter}
                castShadow
                receiveShadow
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

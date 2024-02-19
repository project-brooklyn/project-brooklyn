import * as THREE from 'three';

const tileConfig = {
    width: 1,
    height: 0.25,
}

// Converts map coordinates to render coordinates.
function convertToRenderCoordinates(mapVector) {
    return new THREE.Vector3(
        mapVector.x,
        mapVector.z,
        mapVector.y
    )
}

// Produces the geometry for a map tile.
function renderTile(tile) {
    const position = convertToRenderCoordinates(tile)

    return <>
        <mesh position={ [position.x, position.y, position.z] }>
            <boxGeometry args={ [tileConfig.width, tileConfig.height, tileConfig.width] } />
            <meshBasicMaterial
                color={ tile.type.material.color }
            />
        </mesh>
    </>
}

export default function MapView({gameMap})
{
    const tilesMeshes = gameMap.mapData.map(renderTile)

    return <>
        {tilesMeshes}
    </>
}

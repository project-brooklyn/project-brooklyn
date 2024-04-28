import * as THREE from 'three';

export const tileConfig = {
    width: 1,
    height: 0.25,
};

export const modelFiles = {
    guy: './guy.glb',
    portal: './portal1s.glb',
    castle: './Simple_Base_v1.obj',
    flag: './flag.glb',
    arrow: './arrow.glb',
    rock: './rock.glb',
    arrowTower: './simple_building.glb',
    rockTower: './simple_building.glb',
};

// Converts map coordinates to render coordinates.
export function convertToRenderCoordinates(mapVector, offset = {x: 0, y: 0, z: 0}) {
    return new THREE.Vector3(
        mapVector.x * tileConfig.width - offset.x,
        mapVector.z * tileConfig.height,
        mapVector.y * tileConfig.width - offset.y
    )
};

import * as THREE from 'three';

export const tileConfig = {
    width: 1,
    height: 0.25,
};

export const modelFiles = {
    guy: './guy.glb',
    portal: './portal.glb',
    castle: './simple_base_v1.obj',
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
        mapVector.z * tileConfig.height - offset.z,
        mapVector.y * tileConfig.width - offset.y
    )
};

export const centerObjModel = (objModel) => {
    objModel.traverse((child) => {
        if (child.isMesh) {
            child.geometry.computeBoundingBox();
            const boundingBox = child.geometry.boundingBox;
            const center = boundingBox.getCenter(new THREE.Vector3());

            child.position.set(-center.x, 0, -center.z);
        }
    })
}

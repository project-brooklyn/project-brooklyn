import * as THREE from 'three';

export const tileConfig = {
    width: 1,
    height: 0.25,
};

export const modelFiles = { 
    guy: './basic/robot.glb',
    lamb: './basic/lamb.glb',
    cow: './basic/spherical_cow.glb',
    portal: './basic/portal.glb',
    castle: './basic/house.glb',
    flag: './basic/flag.glb',
    arrow: './basic/arrow.glb',
    rock: './basic/cannonball.glb',
    arrowTower: './basic/ballista_tower.glb',
    rockTower: './basic/cannon_tower.glb',
    laserTower: './basic/laser_tower.glb',
    placeholder: './pointer.glb',
};

// Converts map coordinates to render coordinates.
export function convertToRenderCoordinates(mapVector, offset = {x: 0, y: 0, z: 0}) {
    return new THREE.Vector3(
        mapVector.x * tileConfig.width - offset.x,
        mapVector.z * tileConfig.height - offset.z,
        mapVector.y * tileConfig.width - offset.y
    )
}

export const centerObjModel = (objLoader) => {
    objLoader.traverse((child) => {
        if (child.isMesh) {
            child.geometry.computeBoundingBox();
            const boundingBox = child.geometry.boundingBox;
            const center = boundingBox.getCenter(new THREE.Vector3());

            child.position.set(-center.x, 0, -center.z);
        }
    })
}

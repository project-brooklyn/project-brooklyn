import * as THREE from 'three';

export const tileConfig = {
    width: 1,
    height: 0.25,
};

export const DEFAULT_SCALE = 0.01;

export const modelFiles = { 
    arrow: './basic/arrow.glb',
    arrowTower: './basic/ballista_tower.glb',
    buffTower: './basic/buff_tower.glb',
    castle: './basic/house.glb',
    cow: './basic/spherical_cow.glb',
    dollar: './basic/dollar.glb',
    fireTower: './basic/flame_tower.glb',
    flag: './basic/flag.glb',
    flame: './basic/flame.glb',
    guy: './basic/robot.glb',
    iceTower: './basic/ice_tower.glb',
    lamb: './basic/lamb.glb',
    laserTower: './basic/laser_tower.glb',
    moneyTower: './basic/money_tower.glb',
    placeholder: './placeholder.glb',
    portal: './basic/portal.glb',
    repairTower: './basic/repair_tower.glb',
    rock: './basic/cannonball.glb',
    rockTower: './basic/cannon_tower.glb',
    sawBlade: './basic/saw_blade.glb',
    sawTower: './basic/saw_tower.glb',
    slowTower: './basic/slow_tower.glb',
    snowball: './basic/snowball.glb',
    spikes: './basic/arrow.glb', // reuse arrows as spikes
    spikeTower: './basic/spike_tower.glb',
    wrench: './basic/wrench.glb',
};

export const statusIcons = {
    BUFFED: './icons/buff.png',
    SLOWED: './icons/snail.png',
    BURNED: './icons/fire.png',
    FROZEN: './icons/ice.png',
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

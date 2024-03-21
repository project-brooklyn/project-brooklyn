import { useLoader } from '@react-three/fiber';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

export const tileConfig = {
    width: 1,
    height: 0.25,
};

export const modelFiles = {
    guy: './guy.glb',
    portal: './portal1s.glb',
    castle: './castle_3d_model.glb',
    flag: './flag.glb',
};

// Converts map coordinates to render coordinates.
export function convertToRenderCoordinates(mapVector, offset = {x: 0, y: 0, z: 0}) {
    return new THREE.Vector3(
        mapVector.x * tileConfig.width - offset.x,
        mapVector.z * tileConfig.height,
        mapVector.y * tileConfig.width - offset.y
    )
};

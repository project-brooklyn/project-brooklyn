import { useLoader } from '@react-three/fiber';
// import React from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const tileConfig = {
    width: 1,
    height: 0.25,
};

// Converts map coordinates to render coordinates.
function convertToRenderCoordinates(mapVector, offset = {x: 0, y: 0, z: 0}) {
    return new THREE.Vector3(
        mapVector.x * tileConfig.width - offset.x,
        mapVector.z * tileConfig.height,
        mapVector.y * tileConfig.width - offset.y
    )
};

// Produces the geometry for a map tile.
export function renderTile(tile) {
    const position = convertToRenderCoordinates(tile)
    const spacer = 0.00; // add space between tiles to see better, remove after improved textures

    return (
                                                // place tiles below other objects
        <mesh position={ [position.x, position.y - tileConfig.height/2, position.z] } key={`${tile.x},${tile.y},${tile.z}`}>
            <boxGeometry args={ [tileConfig.width*(1-spacer), tileConfig.height*(1-spacer), tileConfig.width*(1-spacer)] } />
            <meshBasicMaterial
                color={ tile.type.material.color }
            />
        </mesh>
    )
};

// Converts an object to a react-three-fiber component.
export const objectToComponent = (obj) => {
    const { modelFileLocation, scale, name, hp, offset, spawnedAt } = obj;
    if (!hp) return;
    const position = convertToRenderCoordinates(obj, offset);
    const {rotation} = obj;

    const gltf = useLoader(GLTFLoader, modelFileLocation);
    return (<primitive
        key={name+spawnedAt}
        object={gltf.scene.clone(true)}
        scale={scale}
        position={[position.x, position.y, position.z]}
        rotation={[rotation.x, rotation.y, rotation.z]}
    />);
};

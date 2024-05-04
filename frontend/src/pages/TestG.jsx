import { OrbitControls, PerspectiveCamera, Text } from '@react-three/drei'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import DemoMap from "../map/DemoMap";
import MapView from '../components/views/MapView';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { useState } from 'react';
import * as THREE from 'three'

function Gladiator({position}) {
    const gltf = useLoader(GLTFLoader, './guy.glb');
    return <primitive object={gltf.scene} scale={0.4} position={position}/>;
}


function ComponentDisplay({gameMap, enemies}) {
    const [position, setPosition] = useState([0,0,0]);
    
    useFrame(() => {
        setPosition([Math.sin(performance.now() / 1000) * 5, 0, 0]);
    });

    return <>
        <PerspectiveCamera makeDefault fov={50} position={ [0, 10, 0] }/>
        <OrbitControls target={new THREE.Vector3(gameMap.width/2-.5,gameMap.height/2,gameMap.depth/2-.5)}/>

        <ambientLight intensity={ 2 } />
        <Gladiator position={position}/>

        <MapView gameMap={gameMap}/>
    </>
}

const TestG = () => {

    return (<>
        <h1>Test Page G</h1>
        <Canvas>
            <ComponentDisplay gameMap={new DemoMap()} enemies={[]}/>
        </Canvas>
    </>)
};

export default TestG;

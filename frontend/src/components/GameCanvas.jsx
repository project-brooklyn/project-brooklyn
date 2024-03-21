import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, Text } from '@react-three/drei';

import { levels } from "../levels";

import Castle from "../entities/Castle";
import MapView from "./MapView";
import Portal from "../entities/Portal";
import EnemyView from "./EnemyView";
import StructureView from "./StructureView";

export default function GameCanvas({game}) {
    const { gameMap } = game;
    const { width, depth, height, heightMap } = gameMap;
    
    const [castle, portal] = [new Castle(width-1, depth-1, heightMap.at(-1).at(-1)), new Portal(0, 0, heightMap[0][0])];
  
    const [enemies, setEnemies] = useState([]);
    const ref = useRef(null);

    useEffect(() => {
        const animate = () => {
            game.tick()
            setEnemies([...game.enemies]);
            ref.current = requestAnimationFrame(animate);
        }
        ref.current = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(ref.current);
    }, []);

    const startDefendPhase = () => {
        if (game.phase !== 'build') return;
        game.level += 1;
        game.phase = 'defend';
        game.setSteps(portal.position, castle.position);

        let {enemy, count, delay} = levels[game.level];
        const interval = setInterval(() => {
            game.spawnEnemy(enemy, portal.position);

            count--;
            if (!count) clearInterval(interval);
        }, delay);
    };


    return <Canvas>
        <PerspectiveCamera makeDefault fov={50} position={ [20, 15, 20] }/>
        <OrbitControls target={new THREE.Vector3(width/2-.5, 0, depth/2-.5)}/>
        <ambientLight intensity={2} />

        <Text onClick={startDefendPhase} position={[width/2-0.5, height/2, 0]}>START</Text>

        <StructureView structures={[castle, portal]}/>
        <EnemyView enemies={enemies}/>

        <MapView gameMap={gameMap}/>
    </Canvas>
};

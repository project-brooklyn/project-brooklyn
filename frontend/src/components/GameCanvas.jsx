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
import ProjectileView from "./ProjectileView";
import ArrowTower from "../entities/towers/ArrowTower";

export default function GameCanvas({game}) {
    const { gameMap } = game;
    const { width, depth, height, heightMap } = gameMap;
    const [castle, portal] = [new Castle(width-1, depth-1, heightMap.at(-1).at(-1)), new Portal(0, 0, heightMap[0][0])];
  
    const [enemies, setEnemies] = useState([]);
    const [towers, setTowers] = useState([
        new ArrowTower(width-1, 0, heightMap.at(-1).at(0)),
        new ArrowTower(0, depth-1, heightMap.at(0).at(-1))
    ]);
    const [projectiles, setProjectiles] = useState([]);
    const ref = useRef(null);
    

    useEffect(() => {
        const animate = () => {
            game.tick()
            setEnemies([...game.enemies]);
            towersAttack(game.enemies);
            setProjectiles([...game.projectiles]);
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
    
    const towersAttack = (enemies) => {
        for (let tower of towers) {
            let attacked = false;
            for (let enemy of enemies) {
                if (!enemy.hp) continue;
                const path = tower.canAttack(enemy.position, heightMap);
                if (path) {
                    const projectile = tower.createProjectile(path);
                    game.addProjectile(projectile);
                    
                    attacked = true;
                    break;
                }
            }
            if (!attacked && tower.currentCooldown) tower.currentCooldown--;
        }
    }

    return <Canvas>
        {/* adds axes, [xyz] = [rgb] */}
        <axesHelper args={[width, depth, height]}/>

        <PerspectiveCamera makeDefault fov={50} position={ [20, 15, 20] }/>
        <OrbitControls target={new THREE.Vector3(width/2-.5, 0, depth/2-.5)}/>
        <ambientLight intensity={2} />

        <Text onClick={startDefendPhase} position={[width/2-0.5, height/2, 0]}>START</Text>

        <StructureView structures={[castle, portal, ...towers]}/>
        <EnemyView enemies={enemies}/>
        <ProjectileView projectiles={projectiles}/>

        <MapView gameMap={gameMap}/>
    </Canvas>
};

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
import RockTower from "../entities/towers/RockTower";
import GameInfo from "./GameInfo";

export default function GameCanvas({game}) {
    const { gameMap } = game;
    const { width, depth, height, heightMap } = gameMap;
    const [castle, portal] = [new Castle(width-1, depth-1, heightMap.at(-1).at(-1)), new Portal(0, 0, heightMap[0][0])];
  
    const [enemies, setEnemies] = useState([]);
    const [towers, setTowers] = useState([
        castle,
        portal,
        new ArrowTower(width-1, 0, heightMap.at(-1).at(0)),
        new RockTower(0, depth-1, heightMap.at(0).at(-1))
    ]);
    game.towers = towers; // will need to change to game.addTower(tower) when building towers is implemented
    
    const [projectiles, setProjectiles] = useState([]);
    const ref = useRef(null);
    
    useEffect(() => {
        const animate = () => {
            game.tick()

            handleEnemiesAtCastle(game.enemies);
            setTowers([...game.towers]);

            setEnemies([...game.enemies]);
            towersAttack(game.enemies);
            setProjectiles([...game.projectiles]);

            checkLevelOver();

            ref.current = requestAnimationFrame(animate);
        }
        ref.current = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(ref.current);
    }, []);
    
    const startDefendPhase = () => {
        if (game.phase !== 'build' || game.level === levels.length-1 || game.over) return;
        game.phase = 'defend';
        game.spawningEnemies = true;
        game.setSteps(portal.position, castle.position);
        
        let {enemy, count, delay} = levels[game.level];
        const interval = setInterval(() => {
            game.spawnEnemy(enemy, portal.position);
            
            count--;
            if (!count) {
                clearInterval(interval);
                game.spawningEnemies = false;
            }
        }, delay);
    };
    
    const towersAttack = (enemies) => {
        for (let tower of towers) {
            if (!tower.canAttack) continue;
            let attacked = false;
            for (let enemy of enemies) {
                if (!enemy.hp) continue;
                const path = tower.canAttack(enemy.position, heightMap);
                if (path) {
                    const projectile = tower.createProjectile(path);
                    game.addProjectile(projectile);
                    enemy.hp = Math.max(enemy.hp - tower.damage, 0);

                    attacked = true;
                    break;
                }
            }
            if (!attacked && tower.currentCooldown) tower.currentCooldown--;
        }
    };

    const handleEnemiesAtCastle = (enemies) => {
        for (const enemy of enemies)  {
            if (
                enemy.position[0] === castle.position[0] &&
                enemy.position[1] === castle.position[1] &&
                enemy.position[2] === castle.position[2] &&
                enemy.hp // enemy is alive at castle
            ) {
                castle.takeDamage(enemy.hp);
                if (castle.hp <= 0) game.over = true;
                enemy.hp = 0;
            }
        }
    };

    const checkLevelOver = () => {
        if (
            game.phase === 'defend' && 
            !game.spawningEnemies && 
            !game.enemies.some(enemy => !!enemy.hp)
        ) {
            setEnemies([]);
            game.enemies = enemies;
            game.level++;

            // TODO: implement score phase
            game.phase = 'score';
            setTimeout(() => game.phase = 'build', 3000);
        }
    };

    return <Canvas>
        {/* adds axes, [xyz] = [rgb] */}
        <axesHelper args={[width, depth, height]}/>
        <Text onClick={startDefendPhase} position={[width/2-0.5, height/2, 0]}>
            {game.over ? 'GAME OVER' : 'START'}
        </Text>
        <GameInfo level={game.level} phase={game.phase} height={height} depth={depth}/>

        <PerspectiveCamera makeDefault fov={50} position={ [20, 15, 20] }/>
        <OrbitControls target={new THREE.Vector3(width/2-.5, 0, depth/2-.5)}/>
        <ambientLight intensity={2} />

        <StructureView structures={towers}/>
        <EnemyView enemies={enemies}/>
        <ProjectileView projectiles={projectiles}/>

        <MapView gameMap={gameMap}/>
    </Canvas>
};

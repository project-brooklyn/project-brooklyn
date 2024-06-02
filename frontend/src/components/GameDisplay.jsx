import { useEffect, useState } from "react";
import * as THREE from "three";
import { OrbitControls, PerspectiveCamera, Text } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

import { levels } from "../levels";

import Castle from "../entities/Castle";
import MapView from "./views/MapView";
import Portal from "../entities/Portal";
import EnemyView from "./views/EnemyView";
import StructureView from "./views/StructureView";
import ProjectileView from "./views/ProjectileView";
import ArrowTower from "../entities/towers/ArrowTower";
import RockTower from "../entities/towers/RockTower";
import GameInfo from "./ui/GameInfo";
import BuyMenu from "./ui/BuyMenu";
import Guy from "../entities/enemies/Guy";
import Arrow from "../entities/projectiles/Arrow";
import Rock from "../entities/projectiles/Rock";

export default function GameDisplay({game, assets}) {
    const { gameMap } = game;
    const { width, depth, height, heightMap } = gameMap;

    const castle = new Castle(width-1, depth-1, heightMap.at(-1).at(-1))
    const portal = new Portal(0, 0, heightMap[0][0]);
  
    const towerConstructors = [ArrowTower, RockTower];
    const [newTower, setNewTower] = useState(null);

    const [goldReward, setGoldReward] = useState(100);
    const [enemies, setEnemies] = useState([]);
    const [structures, setStructures] = useState([
        castle,
        portal,
        new ArrowTower(width-1, 0, heightMap.at(-1).at(0)),
        new RockTower(0, depth-1, heightMap.at(0).at(-1))
    ]);
    
    const [projectiles, setProjectiles] = useState([]);

    useEffect(() => {
        for (let structure of structures){
            game.addTower(structure);
        }
    }, []);

    useFrame((_state, _delta, _xrFrame) => {
        game.tick();

        handleEnemiesAtCastle(game.enemies);
        towersAttack(game.enemies);

        setEnemies([...game.enemies]);
        setProjectiles([...game.projectiles]);

        checkLevelOver();
    })
    
    const startDefendPhase = () => {
        if (game.phase !== 'build' || game.level === levels.length-1 || game.over) return;
        game.phase = 'defend';
        game.spawningEnemies = true;
        game.enemies = [];
        game.projectiles = [];
        game.setSteps(portal.position, castle.position);

        setNewTower(null);
        setEnemies(game.enemies);
        setProjectiles(game.projectiles);
        
        const level = levels[game.level];
        game.setupEnemySpawn(level);
        setGoldReward(() => level.gold);
    };
    
    const towersAttack = (enemies) => {
        for (let row of game.towers) {
            for (let tower of row) {
                if (!tower || !tower.canAttack) continue;
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
            setProjectiles([]);
            setNewTower(null);

            game.enemies = [];
            game.projectiles = [];
            game.gold += goldReward;
            game.level++;

            // TODO: implement score phase
            game.phase = 'score';
            setTimeout(() => game.phase = 'build', 3000);
        }
    };

    const buildTower = () => {
        const [x, y, z] = [newTower.x, newTower.y, newTower.z];
        if (game.phase !== 'build' || game.over) return;
        if (z !== heightMap.at(x).at(y)) return;
        if (game.towers[x][y]) return;        
        if (game.gold < newTower.price) return;
        
        const copy = new newTower.constructor(x, y, z);
        setStructures(oldStructures => [...oldStructures, copy]);
        game.addTower(copy);
        game.gold -= newTower.price;
        if (game.gold < newTower.price) setNewTower(null);
    }

    return <>
        <axesHelper args={[width, depth, height]}/>
        <Text onClick={startDefendPhase} position={[width/2-0.5, height/2 + 1, 0]}>
            {game.over ? 'GAME OVER' : 'START'}
        </Text>
        <GameInfo level={game.level} phase={game.phase} height={height} depth={depth} gold={game.gold} />
        <BuyMenu
            width={width} depth={depth} 
            towerConstructors={towerConstructors} 
            newTower={newTower}
            setNewTower={setNewTower}
        />
        
        <PerspectiveCamera makeDefault fov={50} position={ [20, 15, 20] }/>
        <OrbitControls target={new THREE.Vector3(width/2-.5, 0, depth/2-.5)}/>
        <ambientLight intensity={2} />

        <StructureView structures={structures}/>
        <EnemyView enemies={enemies}/>
        <ProjectileView projectiles={projectiles}/>

        <MapView assets={assets} gameMap={gameMap} buildTower={buildTower} newTower={newTower}/>
    </>
}

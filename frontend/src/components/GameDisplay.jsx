import { useState } from "react";
import * as THREE from "three";
import { OrbitControls, PerspectiveCamera, Text } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

import { levels } from "../levels";
import { BUILD, DEFEND, SCORE } from "../Game";

import MapView from "./views/MapView";
import EnemyView from "./views/EnemyView";
import StructureView from "./views/StructureView";
import ProjectileView from "./views/ProjectileView";
import ArrowTower from "../entities/towers/ArrowTower";
import RockTower from "../entities/towers/RockTower";
import GameInfo from "./ui/GameInfo";
import BuyMenu from "./ui/BuyMenu";
import LaserTower from "../entities/towers/LaserTower";

export default function GameDisplay({game, assets}) {
    const { gameMap, castle, portal } = game;
    const { width, depth, height } = gameMap;

    const towerConstructors = [ArrowTower, RockTower, LaserTower];

    const [goldReward, setGoldReward] = useState(100);
    const [enemies, setEnemies] = useState([]);

    const [projectiles, setProjectiles] = useState([]);

    useFrame((_state, _delta, _xrFrame) => {
        game.tick();

        handleEnemiesAtCastle(game.enemies);
        towersAttack(game.enemies);

        setEnemies([...game.enemies]);
        setProjectiles([...game.projectiles]);

        checkLevelOver();
    })

    const startDefendPhase = () => {
        if (game.phase !== BUILD || game.level === levels.length-1 || game.over) return;
        game.phase = DEFEND;
        game.spawningEnemies = true;
        game.enemies = [];
        game.projectiles = [];

        setEnemies(game.enemies);
        setProjectiles(game.projectiles);

        const level = levels[game.level];
        game.setSteps(portal.position, castle.position, level.enemy.SPEED);
        game.setupEnemySpawn(level);
        setGoldReward(() => level.gold);
    };

    const towersAttack = (enemies) => {
        for (let tower of game.towers.flat()) {
            // handle null, portal, and castle
            if (!tower || !tower.getProjectilePath) continue;

            // handle tower cooldown
            if (tower.currentCooldown) {
                --tower.currentCooldown;
                continue;
            }

            // check all enemies, attack first (farthest along path)
            for (let enemy of enemies) {
                if (!enemy.hp) continue;
                const path = tower.getProjectilePath(enemy.position, gameMap);
                if (path.length) {
                    const projectile = tower.createProjectile(path);
                    game.addProjectile(projectile);

                    // TODO: this is instant damage, convert to when projectile hits?
                    enemy.hp = Math.max(enemy.hp - tower.damage, 0);

                    break;
                }
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
            game.phase === DEFEND &&
            !game.spawningEnemies &&
            !game.enemies.some(enemy => !!enemy.hp)
        ) {
            setEnemies([]);
            setProjectiles([]);

            game.enemies = [];
            game.projectiles = [];
            game.gold += goldReward;
            game.level++;

            // TODO: implement score phase
            game.phase = SCORE;
            setTimeout(() => game.phase = BUILD, 3000);
        }
    };

    return <>
        <axesHelper args={[width, depth, height]}/>
        <Text onClick={startDefendPhase} position={[width/2-0.5, height/2 + 1, 0]}>
            {game.over ? 'GAME OVER' : 'START'}
        </Text>
        <GameInfo level={game.level} phase={game.phase} height={height} depth={depth} gold={game.gold} />
        {game.phase === BUILD &&
            <BuyMenu
                game={game}
                towerConstructors={towerConstructors}
            />
        }

        <PerspectiveCamera makeDefault fov={50} position={ [20, 15, 20] }/>
        <OrbitControls target={new THREE.Vector3(width/2-.5, 0, depth/2-.5)}/>
        <ambientLight intensity={2} />

        <StructureView structures={game.towers}/>
        <EnemyView enemies={enemies}/>
        <ProjectileView projectiles={projectiles}/>

        <MapView assets={assets} gameMap={gameMap} mouseInput={game.mouseInput}/>
    </>
}

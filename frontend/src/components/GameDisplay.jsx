import { useState } from "react";
import * as THREE from "three";
import { OrbitControls, PerspectiveCamera, Text } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

import { BUILD } from "../Game";

import MapView from "./views/MapView";
import EnemyView from "./views/EnemyView";
import StructureView from "./views/StructureView";
import ProjectileView from "./views/ProjectileView";
import PathView from "./views/PathView";
import SelectedTowerView from "./views/SelectedTowerView";
import { RangeIndicatorView } from "./views/RangeIndicatorView";

export default function GameDisplay({game, assets, selectedTower}) {
    const { gameMap } = game;
    const { width, depth, height } = gameMap;

    const [ticks, setTicks] = useState(0);

    useFrame((_state, _delta, _xrFrame) => {
        game.tick();

        setTicks(ticks + 1); // this is a hack to make the canvas re-render
        // Without this, `GameDisplay` will not re-render during the DEFEND phase. (The game calculations do still occur though.)
    })


    return <>
        <axesHelper args={[width, depth, height]}/>
        {game.phase === BUILD && <Text
            onClick={() => game.gold += 100}
            position={[width/2-0.5, 0, -0.51]}
            rotation={[0, Math.PI, 0]}
            fontSize={0.2}
        >
            FREE GOLD!
        </Text>}

        {selectedTower && <>
            <SelectedTowerView selectedTower={selectedTower} />
            <RangeIndicatorView tower={selectedTower} gameMap={gameMap}/>
        </>}

        <PerspectiveCamera makeDefault fov={50} position={ [15, 10, 15] }/>
        <OrbitControls target={new THREE.Vector3(width/2-.5, 0, depth/2-.5)}/>
        <ambientLight intensity={2} />

        <StructureView structures={game.towers}/>
        <EnemyView enemies={game.enemies}/>
        <ProjectileView projectiles={game.projectiles}/>
        {game.phase === BUILD && <PathView path={game.path.map(([x, y]) => [x, y, gameMap.getElevation(x,y,true)])} />}

        <MapView assets={assets} gameMap={gameMap} overrides={game.gameMapOverrides} mouseInput={game.mouseInput}/>
    </>
}

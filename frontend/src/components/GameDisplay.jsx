import { useEffect, useRef, useState } from "react";
import { OrbitControls, PerspectiveCamera, Sky, Text } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

import { BUILD } from "../Game";

import MapView from "./views/MapView";
import EnemyView from "./views/EnemyView";
import StructureView from "./views/StructureView";
import ProjectileView from "./views/ProjectileView";
import PathView from "./views/PathView";
import SelectedTowerView from "./views/SelectedTowerView";
import { RangeIndicatorView } from "./views/RangeIndicatorView";


export default function GameDisplay({ game, assets, selectedTower }) {
    const { gameMap, cameraTarget } = game;
    const { width, depth, height } = gameMap;

    // `ready` is used to ensure that `OrbitControls` consistently registers
    // for key events. It intermittently stops working on refresh otherwise.
    // We may be able to remove this once the root cause is identified.
    const [ready, setReady] = useState(false);

    const [ticks, setTicks] = useState(0);

    const orbitControls = useRef();

    useEffect(() => {
        setReady(true);
    }, [])

    useEffect(() => {
        if (ready && orbitControls.current) {
            orbitControls.current.listenToKeyEvents(window);
        }
    }, [orbitControls, ready])

    useFrame((_state, _delta, _xrFrame) => {
        game.tick();

        setTicks(ticks + 1); // this is a hack to make the canvas re-render
        // Without this, `GameDisplay` will not re-render during the DEFEND phase. (The game calculations do still occur though.)
    })

    return <>
        <axesHelper args={[width, depth, height]} />
        {game.phase === BUILD && <Text
            onClick={() => game.gold += 100}
            position={[width / 2 - 0.5, 0, -0.51]}
            rotation={[0, Math.PI, 0]}
            fontSize={0.2}
        >
            FREE GOLD!
        </Text>}

        {selectedTower && <>
            <SelectedTowerView selectedTower={selectedTower} />
            <RangeIndicatorView tower={selectedTower} gameMap={gameMap} />
        </>}

        <PerspectiveCamera makeDefault fov={50} position={[15, 10, 15]} />
        <OrbitControls
            ref={orbitControls}
            target={cameraTarget}
            enablePan={true}
            screenSpacePanning={false}
            minDistance={[5]}
            maxDistance={[50]}
            maxPolarAngle={[Math.PI / 2]}
            keys={{
                LEFT: 'KeyA',
                UP: 'KeyW',
                RIGHT: 'KeyD',
                BOTTOM: 'KeyS'
            }}
            keyPanSpeed={25.0}
        />
        <ambientLight intensity={2} />
        <Sky
            sunPosition={[-10000, 30, -10000]}
            inclination={1.4}
            mieCoefficient={0.005}
            mieDirectionalG={0.7}
            rayleigh={4}
            turbidity={10}
        />

        <StructureView structures={game.getAllTowers()} />
        <EnemyView enemies={game.enemies} />
        <ProjectileView projectiles={game.projectiles} />
        {game.phase === BUILD && <PathView path={game.path.map(([x, y]) => [x, y, gameMap.getElevation(x, y, true)])} />}

        <MapView assets={assets} gameMap={gameMap} overrides={game.gameMapOverrides} mouseInput={game.mouseInput} />
    </>
}

import { useEffect, useRef, useState } from "react";
import { OrbitControls, PerspectiveCamera, Sky, Text } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';

import { BUILD } from "../Game";

import MapView from "./views/MapView";
import EnemyView from "./views/EnemyView";
import StructureView from "./views/StructureView";
import ProjectileView from "./views/ProjectileView";
import PathView from "./views/PathView";
import SelectedTowerView from "./views/SelectedTowerView";
import { RangeIndicatorView } from "./views/RangeIndicatorView";
import Stats from "three/examples/jsm/libs/stats.module.js";
import { useGameContext } from "./GameContext";


export default function GameDisplay({ assets, selectedTower }) {
    const game = useGameContext();
    const { gameMap, cameraTarget } = game;
    const { width, depth, height } = gameMap;
    const { gl, scene } = useThree();

    // `ready` is used to ensure that `OrbitControls` consistently registers
    // for key events. It intermittently stops working on refresh otherwise.
    // We may be able to remove this once the root cause is identified.
    const [ready, setReady] = useState(false);

    const [ticks, setTicks] = useState(0);
    const [stats, _setStats] = useState(new Stats());

    const orbitControls = useRef();
    const skybox = useRef();
    const shadowCamera = useRef();

    useEffect(() => {
        stats.showPanel(0);
        stats.domElement.style.top = "128px";
        document.body.appendChild(stats.domElement);

        return () => {
            stats.domElement.remove();
        }
    }, []);

    useEffect(() => {
        setReady(true);

        if (shadowCamera.current) {
            shadowCamera.current.left = -width;
            shadowCamera.current.right = width;
            shadowCamera.current.top = 2 * height;
            shadowCamera.current.bottom = 1;
            shadowCamera.current.near = 10;
            shadowCamera.current.far = 25;
        }
    }, [width, height])

    useEffect(() => {
        if (ready && orbitControls.current) {
            orbitControls.current.listenToKeyEvents(window);
        }
    }, [orbitControls, ready])

    useEffect(() => {
        const graphicsFolder = game.devGui.addFolder("Graphics");
        graphicsFolder.add(gl.shadowMap, "enabled")
            .name("shadows")
            .onChange(_value => {
                scene.traverse(function (child) {
                    if (child.material) {
                        child.material.needsUpdate = true
                    }
                })
            });
        graphicsFolder.close();

        const skyboxFolder = graphicsFolder.addFolder("Skybox");
        const uniforms = skybox.current.material.uniforms;
        skyboxFolder.add(uniforms.mieCoefficient, "value", 0, 1, 0.0001).name("mieCoefficient");
        skyboxFolder.add(uniforms.mieDirectionalG, "value", 0, 1, 0.001).name("mieDirectionalG");
        skyboxFolder.add(uniforms.rayleigh, "value", 0, 20, 0.01).name("rayleigh");
        skyboxFolder.add(uniforms.turbidity, "value", 0, 100, 0.1).name("turbidity");
        skyboxFolder.add(uniforms.sunPosition.value, "y", 0, 500, 0.1).name("sunPosition.y");
        skyboxFolder.close();

        return () => {
            skyboxFolder.destroy();
            graphicsFolder.destroy();
        }
    }, [game.devGui, gl.shadowMap, scene])

    useFrame((_state, _delta, _xrFrame) => {
        game.tick();
        stats.update();

        setTicks(ticks + 1); // this is a hack to make the canvas re-render
        // Without this, `GameDisplay` will not re-render during the DEFEND phase. (The game calculations do still occur though.)
    })

    return <>
        <axesHelper args={[width, depth, height]} />
        {game.phase === BUILD && <Text
            onClick={() => game.gold += 500}
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
        <directionalLight
            position={[-0.75 * width, height, -0.75 * width]}
            intensity={2.0}
            castShadow
        >
            <orthographicCamera ref={shadowCamera} attach='shadow-camera' />
        </directionalLight>
        <Sky
            ref={skybox}
            sunPosition={[-10000, 30, -10000]}
            inclination={1.4}
            mieCoefficient={0.005}
            mieDirectionalG={0.7}
            rayleigh={4}
            turbidity={10}
        />

        <StructureView assets={assets} structures={game.getAllTowers()} />
        <EnemyView assets={assets} enemies={game.enemies} />
        <ProjectileView projectiles={game.projectiles} />
        {game.phase === BUILD && <PathView path={game.path.map(([x, y]) => [x, y, gameMap.getElevation(x, y, true)])} />}

        <MapView assets={assets} gameMap={gameMap} overrides={game.gameMapOverrides} mouseInput={game.mouseInput} />
    </>
}

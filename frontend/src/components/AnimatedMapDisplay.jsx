import { useEffect, useRef } from "react";
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { getSteps } from "../utils";

const AnimatedMapDisplay = ({gameMap, tileConfig, path, enemies}) => {
    const mapRef = useRef();
    const center = new THREE.Vector3(gameMap.width/2,0,gameMap.width/2);
    const {heightMap} = gameMap;
    tileConfig ||= {
        width: 1,
        height: 0.25,
    };
    const offset = {
        x: tileConfig.width/2 - center.x,
        y: tileConfig.height/2,
        z: tileConfig.width/2 - center.z,
    };
    const animationFunctions = [];

    const loadModel = (loader, scene, model, x, y, z, scale = 1, rotation = 0, curryAnimate) => {
        loader.load(model, (m) => {
            m.scene.scale.set(scale, scale, scale);
            m.scene.position.set(
                x + offset.x,
                tileConfig.height*y + offset.y,
                z + offset.z,
            );
            m.scene.rotation.y = rotation;

            // Does this make any sense at all?
            if (curryAnimate) animationFunctions.push(curryAnimate(m.scene));

            scene.add(m.scene);
        });
    };

    useEffect(() => {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(50, window.innerWidth/window.innerHeight, 0.1, 2000);
        camera.position.x = 15;
        camera.position.y = 10;
        camera.position.z = 15;
        scene.add(camera);
    
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        mapRef.current.appendChild(renderer.domElement);

        const controls = new OrbitControls(camera, mapRef.current);
        controls.enableDamping = true;

        // Build the Map
        const mapData = gameMap.map();
        const spacer = 0.05; // add space between tiles to see better, remove after improved textures
        const tileGeometry = new THREE.BoxGeometry(tileConfig.width*(1-spacer), tileConfig.height*(1-spacer), tileConfig.width*(1-spacer));
        for (let tile of mapData) {
            const material = new THREE.MeshBasicMaterial(tile.type.material);
            const mesh = new THREE.Mesh(tileGeometry, material);
            
            mesh.position.x = tile.x + tileConfig.width/2 - center.x;
            mesh.position.y = tile.z * tileConfig.height;  // Switch y and z because we use z as height
            mesh.position.z = tile.y + tileConfig.width/2 - center.z;
            scene.add(mesh);
        }

        // add light
        var light = new THREE.AmbientLight(0x404040);
        light.intensity = 100;
        scene.add(light);

        // add 3d models
        const loader = new GLTFLoader();
        loadModel(loader, scene, '/castle_3d_model.glb', gameMap.width-1, heightMap[gameMap.width-1][gameMap.depth-1], gameMap.depth-1, 0.005, 0);
        loadModel(loader, scene, '/portal1s.glb', 0, heightMap[0][0], 0, 0.1, Math.PI/4);

        if (enemies) {
            for (let enemy of enemies) {
                loadModel(loader, scene, enemy.modelFileLocation, 0, 0, 0, enemy.scale, 0,
                    function (model) {
                        const steps = getSteps(path, heightMap);
                        let stepIndex = 1;
                        return () => {
                            const curr = steps[stepIndex-1];
                            const next = steps[stepIndex];

                            // rotation
                            if (curr[0]<next[0]) model.rotation.y = Math.PI/2;
                            if (curr[0]>next[0]) model.rotation.y = 3*Math.PI/2;
                            if (curr[2]<next[2]) model.rotation.y = 0;
                            if (curr[2]>next[2]) model.rotation.y = Math.PI;

                            // translation
                            model.position.x = next[0] + offset.x;
                            model.position.y = (next[1] + 0.5)*tileConfig.height;
                            model.position.z = next[2] + offset.z;

                            if (stepIndex<steps.length-1) {
                                stepIndex++;
                            } else { // simple remove model
                                model.visible = false;
                            }
                        }
                    }
                );
            }
        }
        
        const tick = () => {
            for (let fn of animationFunctions) fn();

            controls.update();
            renderer.render(scene, camera);
            window.requestAnimationFrame(tick);
        };
    
        tick();
    }, []);

    return <div ref={mapRef}/>
};

export default AnimatedMapDisplay;

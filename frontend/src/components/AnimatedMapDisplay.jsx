import { useEffect, useRef } from "react";
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';


const AnimatedMapDisplay = ({gameMap, tileConfig, path}) => {
    const mapRef = useRef();
    const center = new THREE.Vector3(gameMap.width/2,0,gameMap.width/2);
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
        const tileGeometry = new THREE.BoxGeometry(tileConfig.width, tileConfig.height, tileConfig.width);
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
        loadModel(loader, scene, '/castle_3d_model.glb', gameMap.width-1, 0, gameMap.depth-1, 0.005, 0);
        loadModel(loader, scene, '/portal1s.glb', 0, 0, 0, 0.1, Math.PI/4);
        loadModel(loader, scene, '/flag.glb', 0, 0, 0, 0.1, 0, function (model) {
            // this is a basic example
            // later implementations will take a path argument
            // and use a helper function to follow the path
            return () => {
                model.position.x += .01;
                model.position.z += .01;
            }
        });
        
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

import { useEffect, useRef } from "react";
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const MapDisplay = ({gameMap, tileConfig}) => {
    const mapRef = useRef();
    tileConfig ||= {
        width: 1,
        height: 0.25,
    }

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
            
            mesh.position.x = tile.x + tileConfig.width/2;
            mesh.position.y = tile.z * tileConfig.height;  // Switch y and z because we use z as height
            mesh.position.z = tile.y + tileConfig.width/2;
            scene.add(mesh);
        }

        //test
        var light = new THREE.AmbientLight(0x404040);
        light.intensity = 100;
        scene.add(light);

        const loader = new GLTFLoader();
        loader.load('/castle_3d_model.glb', (gltf) => {
            gltf.scene.scale.set(0.01,0.01,0.01);
            gltf.scene.position.set(5.5,1,5.5);
            const model = gltf.scene;


            scene.add(model);
        }, undefined, function (err) {console.error(err)});
        loader.load('/portal1s.glb', (gltf) => {

            gltf.scene.scale.set(0.2,0.2,0.2);
            gltf.scene.position.set(-5.5,1,-5.5);

            scene.add(gltf.scene)
        });
        
        const tick = () => {    
            controls.update();
            renderer.render(scene, camera);
            window.requestAnimationFrame(tick);
        };
    
        tick();
    }, []);

    return <div ref={mapRef}/>
};

export default MapDisplay;

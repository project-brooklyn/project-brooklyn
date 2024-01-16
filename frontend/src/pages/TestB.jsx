import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'
import Stats from 'stats.js'
import { useEffect, useRef } from 'react'

const TestMap = () => {
    const mapRef = useRef();

    useEffect(() => {
        // Create scene, camera, and renderer
        const scene = new THREE.Scene()
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100)
        camera.position.x = 15
        camera.position.y = 10
        camera.position.z = 15
        scene.add(camera)
        const renderer = new THREE.WebGLRenderer();

        // Create Stats
        const stats = new Stats()
        stats.showPanel(0) // 0: fps, 1: ms, 2: mb, 3+: custom
        mapRef.current.appendChild(stats.dom)

        // Set renderer size
        renderer.setSize(window.innerWidth, window.innerHeight);

        // Append renderer to the component's div
        mapRef.current.appendChild(renderer.domElement);

        // Set Up Controls
        const controls = new OrbitControls(camera, mapRef.current);
        controls.enableDamping = true;

        // Create Map and Add to Scene
        const parameters = {
            grassColor: 0x12b464,
            dirtColor: 0xce8b55,
        }
        
        const tileConfig = {
            width: 1.0,
            height: 0.25,
        }
        
        let geometry = new THREE.BoxGeometry(tileConfig.width, tileConfig.height, tileConfig.width)
        const grassMaterial = new THREE.MeshBasicMaterial({ color: parameters.grassColor })
        const dirtMaterial = new THREE.MeshBasicMaterial({ color: parameters.dirtColor })
        
        const tileMap = []
        
        for (let x = 0; x < 10; x++) {
            for (let z = 0; z < 10; z++) {
                const mesh = new THREE.Mesh(geometry, (x == 4 || x == 5) ? dirtMaterial : grassMaterial)
                mesh.position.x = 1 + x;
                mesh.position.y = 0;
                mesh.position.z = 1 + z;
                scene.add(mesh)
                tileMap.push(mesh)
            }
        }

        // Render the Map
        const tick = () => {
            stats.begin()
    
            // Update controls
            controls.update()
    
            // Render
            renderer.render(scene, camera)
    
            // Call tick again on the next frame
            window.requestAnimationFrame(tick)
            stats.end()
        }
    
        tick()

        // Handle window resize
        const handleResize = () => {
            const newWidth = window.innerWidth;
            const newHeight = window.innerHeight;
    
            // Update camera aspect ratio and renderer size
            camera.aspect = newWidth / newHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(newWidth, newHeight);
        };
    
        // Event listener for window resize
        window.addEventListener('resize', handleResize);
    
        // Cleanup function
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);


    return <div ref={mapRef}/>
}

const TestB = () => {

    return (<>
        <h1>Test Page B</h1>
        <TestMap />
    </>)
}

export default TestB;

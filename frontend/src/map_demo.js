import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'
import Stats from 'stats.js'
import DemoMap from '/src/map/DemoMap.js';
import { TileType } from '/src/map/Tile.js';

/**
 * Debug
 */
const gui = new GUI()

/**
 * Stats
 */
const stats = new Stats()
stats.showPanel(0) // 0: fps, 1: ms, 2: mb, 3+: custom
document.body.appendChild(stats.dom)

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Map
 */
const parameters = {
    grassColor: 0x12b464,
    dirtColor: 0xce8b55,
    unknownColor: 0xc23be8,
}

const tileConfig = {
    width: 1.0,
    height: 0.25,
}

let geometry = new THREE.BoxGeometry(tileConfig.width, tileConfig.height, tileConfig.width)
const grassMaterial = new THREE.MeshBasicMaterial({ color: parameters.grassColor })
const dirtMaterial = new THREE.MeshBasicMaterial({ color: parameters.dirtColor })
const unknownMaterial = new THREE.MeshBasicMaterial({ color: parameters.unknownColor })
const TileTypeMaterials = new Map([
    [TileType.Grass, grassMaterial],
    [TileType.Dirt, dirtMaterial],
]);

const meshes = []


const demoMap = new DemoMap();
demoMap.map().forEach((tile) => {
    const mesh = new THREE.Mesh(geometry, TileTypeMaterials.get(tile.type) ?? unknownMaterial);
    mesh.position.x = 1 + tile.x;
    mesh.position.y = tile.z;
    mesh.position.z = 1 + tile.y;
    scene.add(mesh)
    meshes.push(mesh)
})

// Debug
const generalFolder = gui.addFolder("General")
// generalFolder.add(mesh, 'visible')
generalFolder.add(grassMaterial, 'wireframe')
generalFolder.addColor(parameters, 'grassColor')
   .onChange(() => {
        grassMaterial.color.set(parameters.grassColor)
   })
generalFolder.addColor(parameters, 'dirtColor')
   .onChange(() => {
        dirtMaterial.color.set(parameters.dirtColor)
   })

const tileFolder = gui.addFolder("Tile")
tileFolder.add(tileConfig, "height")
    .min(0)
    .max(1)
    .step(0.25)
    .onChange(() => {
        geometry.dispose()
        geometry = new THREE.BoxGeometry(tileConfig.width, tileConfig.height, tileConfig.width)
        meshes.forEach((mesh) => {
            mesh.geometry = geometry
        })
    })

generalFolder.open()
tileFolder.open()

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Axes Helper
 */
const axesHelper = new THREE.AxesHelper(2)
scene.add(axesHelper)

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 15
camera.position.y = 10
camera.position.z = 15
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Render
 */
const tick = () =>
{
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

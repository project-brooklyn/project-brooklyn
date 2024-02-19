import { Float, OrbitControls, PerspectiveCamera, Text } from '@react-three/drei'

import MapView from './MapView.jsx'
import DemoMap from '../map/DemoMap.js'

export default function Display()
{
    const gameMap = new DemoMap();

    return <>
        <PerspectiveCamera makeDefault fov={50} position={ [15, 10, 15] } />
        <OrbitControls />

        <Text position-y={ 2 } >
            Defend your base!
        </Text>

        <MapView gameMap={gameMap}/>
    </>
}

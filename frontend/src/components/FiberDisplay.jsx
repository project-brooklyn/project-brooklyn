import { OrbitControls, PerspectiveCamera, Text } from '@react-three/drei'

import MapView from './MapView.jsx'
import Castle from '../entities/Castle.js';
import Portal from '../entities/Portal.js';

export default function FiberDisplay({gameMap, enemies}) {

    const castle = new Castle(0,1,0);
    const portal = new Portal(9,1,9);

    return <>
        <PerspectiveCamera makeDefault fov={50} position={ [15, 10, 15] } />
        <OrbitControls />

        <Text position-y={ 2 } >
            Defend your base!
        </Text>
        <ambientLight intensity={ 2 } />

        {castle.fiberComponent()}
        {portal.fiberComponent()}
        {enemies.map((enemy,i) => enemy.fiberComponent(i))}

        <MapView gameMap={gameMap}/>
    </>
}

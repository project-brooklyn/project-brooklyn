import { OrbitControls, PerspectiveCamera, Text } from '@react-three/drei'

import MapView from './MapView.jsx'
import DemoMap from '../map/DemoMap.js'
import Castle from '../entities/Castle.js';
import Portal from '../entities/Portal.js';
import Guy from '../entities/Guy.js';
import { randomInt } from '../utils/math_utils.js';

export default function Display()
{
    const gameMap = new DemoMap();

    const castle = new Castle(0,1,0);
    const portal = new Portal(1,1,1);
    const guys = [];
    for (let i = 0; i < 10; i++) {
        guys.push(new Guy(randomInt(2,9), 1.25, randomInt(2,9)));
    }

    return <>
        <PerspectiveCamera makeDefault fov={50} position={ [15, 10, 15] } />
        <OrbitControls />

        <Text position-y={ 2 } >
            Defend your base!
        </Text>
        <ambientLight intensity={ 2 } />

        {castle.fiberComponent()}
        {portal.fiberComponent()}
        {guys.map(guy => guy.fiberComponent())}

        <MapView gameMap={gameMap}/>
    </>
}

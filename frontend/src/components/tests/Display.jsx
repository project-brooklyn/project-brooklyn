import { useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera, Stats, Text } from '@react-three/drei'

<<<<<<< HEAD:frontend/src/components/Display.jsx
import BaseView from './BaseView.jsx'
import MapView from './MapView.jsx'
import DemoMap from '../map/DemoMap.js'
import Castle from '../entities/Castle.js';
import Portal from '../entities/Portal.js';
import Guy from '../entities/Guy.js';
import { randomInt } from '../utils/math_utils.js';
=======
import MapView from '../MapView.jsx'
import DemoMap from '../../map/DemoMap.js'
import Castle from '../../entities/Castle.js';
import Portal from '../../entities/Portal.js';
import Guy from '../../entities/Guy.js';
import { randomInt } from '../../utils/math_utils.js';
>>>>>>> e790ec6 (create view components for enemy and structure):frontend/src/components/tests/Display.jsx

const castle = new Castle(0,0,1);

export default function Display()
{
    const gameMap = new DemoMap();

    const portal = new Portal(1,1,1);
    const guys = [];
    for (let i = 0; i < 10; i++) {
        guys.push(new Guy(randomInt(2,9), 1.25, randomInt(2,9)));
    }

    const [baseHp, setBaseHp] = useState(castle.hp)
    useFrame(() =>
    {
        // For demonstration purposes.
        castle.hp -= 1
        if (castle.hp < 0) castle.hp = castle.maxHp
        setBaseHp(castle.hp / castle.maxHp)
    })

    return <>
        <Stats />
        <PerspectiveCamera makeDefault fov={50} position={ [15, 10, 15] } />
        <OrbitControls />

        <Text position-y={ 2 } >
            Defend your base!
        </Text>
        <ambientLight intensity={ 2 } />

        <BaseView base={castle} hp={baseHp}/>
        {castle.fiberComponent()}
        {portal.fiberComponent()}
        {guys.map((guy,i) => guy.fiberComponent(i))}

        <MapView gameMap={gameMap}/>
    </>
}

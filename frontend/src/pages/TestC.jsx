import RandomMap from '../map/RandomMap'
import { djikstra } from '../utils'
import AnimatedMapDisplay from '../components/AnimatedMapDisplay';
import Flag from '../enemies/Flag';

const TestC = () => {
    const gameMap = new RandomMap();
    const path = djikstra(gameMap);
    const enemies = [new Flag(0.1)]

    return (<>
        <h1>Test Page C</h1>
        <AnimatedMapDisplay gameMap={gameMap} path={path} enemies={enemies}/>
    </>)
}

export default TestC;

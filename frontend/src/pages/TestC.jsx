import RandomMap from '../map/RandomMap'
import { djikstra } from '../utils/game_utils'
// import AnimatedMapDisplay from '../components/AnimatedMapDisplay';
import Guy from '../entities/Guy';

const TestC = () => {
    const gameMap = new RandomMap();
    const path = djikstra(gameMap);
    const enemies = [new Guy()];

    return (<>
        <h1>Test Page C</h1>
        {/* <AnimatedMapDisplay gameMap={gameMap} path={path} enemies={enemies}/> */}
    </>)
}

export default TestC;

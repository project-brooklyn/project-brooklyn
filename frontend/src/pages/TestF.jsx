import AnimatedMapDisplay from "../components/tests/AnimatedMapDisplay";
import DemoMap from "../map/DemoMap";
import { djikstra } from "../utils/game_utils";

const TestF = () => {
    const gameMap = new DemoMap();
    const path = djikstra(gameMap);

    return (<>
        <h1>Test Page F</h1>
        {/* <AnimatedMapDisplay gameMap={gameMap} path={path} /> */}
    </>)
};

export default TestF;

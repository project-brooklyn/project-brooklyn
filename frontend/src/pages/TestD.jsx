// import MapDisplay from "../components/MapDisplay";
import RandomMap from "../map/RandomMap";
import { djikstra } from "../utils/game_utils";

const TestD = () => {
    const gameMap = new RandomMap();
    const path = djikstra(gameMap);

    return (<>
        <h1>Test Page D</h1>
        {/* <MapDisplay gameMap={gameMap} path={path} /> */}
    </>)
};

export default TestD;

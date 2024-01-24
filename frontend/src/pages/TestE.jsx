import MapDisplay from "../components/MapDisplay";
import ZigZagMap from "../map/ZigZagMap";
import { djikstra } from "../utils";

const TestE = () => {
    const gameMap = new ZigZagMap();
    const path = djikstra(gameMap);

    return (<>
        <h1>Test Page E</h1>
        <MapDisplay gameMap={gameMap} path={path} />
    </>)
};

export default TestE;

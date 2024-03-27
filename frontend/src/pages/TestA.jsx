// import MapDisplay from "../components/MapDisplay";
import DemoMap from "../map/DemoMap";
import RandomMap from "../map/RandomMap";
const TestA = () => {
    const gameMap = [new DemoMap(), new RandomMap()][1];

    return (<>
        <h1>Test Page A</h1>
        {/* <MapDisplay gameMap={gameMap}/> */}
    </>)
};

export default TestA;

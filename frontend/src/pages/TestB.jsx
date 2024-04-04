import Game from "../Game";
import GameCanvas from "../components/GameCanvas";
import ZigZagMap from "../map/ZigZagMap";
import './Test.css';

const TestB = () => {

    return (<>
        <h1>Test Page B (ZigZag)</h1>
        <GameCanvas game={new Game(new ZigZagMap())} />
    </>)
}

export default TestB;

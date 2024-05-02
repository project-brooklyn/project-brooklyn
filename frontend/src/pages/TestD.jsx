import GameCanvas from "../components/GameCanvas";
import RectangleMap from "../map/RectangleMap";
import Game from "../Game";
import './Test.css';

const TestD = () => {

    return (<>
        <h1>Test Page D (Rectangle Map)</h1>
        <GameCanvas game={new Game(new RectangleMap())} />
    </>)
};

export default TestD;

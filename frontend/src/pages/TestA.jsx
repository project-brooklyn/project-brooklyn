import GameCanvas from "../components/GameCanvas";
import RandomMap from "../map/RandomMap";
import Game from "../Game";
import './Test.css';

const TestA = () => {

    return (<>
        <h1>Test Page A (Random)</h1>
        <GameCanvas game={new Game(new RandomMap())} />
    </>)
};

export default TestA;

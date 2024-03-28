import GameCanvas from "../components/GameCanvas";
import MazeMap from "../map/MazeMap";
import Game from "../Game";
import './Test.css';

const TestC = () => {

    return (<>
        <h1>Test Page C (Maze/Climbing Demo)</h1>
        <GameCanvas game={new Game(new MazeMap())} />
    </>)
};

export default TestC;

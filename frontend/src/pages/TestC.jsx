import { Canvas } from "@react-three/fiber";
import GameDisplay from "../components/GameDisplay";
import MazeMap from "../map/MazeMap";
import Game from "../Game";
import './Test.css';
import assets from "../components/assets";

const TestC = () => {

    return <>
        <h1>Test Page C (Maze/Climbing Demo)</h1>
        <Canvas>
            <GameDisplay game={new Game(new MazeMap())} assets={assets} />
        </Canvas>
    </>
};

export default TestC;

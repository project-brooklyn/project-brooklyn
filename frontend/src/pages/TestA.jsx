import { Canvas } from "@react-three/fiber";
import GameDisplay from "../components/GameDisplay";
import RandomMap from "../map/RandomMap";
import Game from "../Game";
import './Test.css';

const TestA = () => {

    return <>
        <h1>Test Page A (Random)</h1>
        <Canvas>
            <GameDisplay game={new Game(new RandomMap())} />
        </Canvas>
    </>
};

export default TestA;

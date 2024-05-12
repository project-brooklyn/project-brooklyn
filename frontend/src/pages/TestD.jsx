import { Canvas } from "@react-three/fiber";
import GameDisplay from "../components/GameDisplay";
import RectangleMap from "../map/RectangleMap";
import Game from "../Game";
import './Test.css';

const TestD = () => {

    return <>
        <h1>Test Page D (Rectangle Map)</h1>
        <Canvas>
            <GameDisplay game={new Game(new RectangleMap())} />
        </Canvas>
    </>
};

export default TestD;

import { Canvas } from "@react-three/fiber";
import Game from "../Game";
import GameDisplay from "../components/GameDisplay";
import ZigZagMap from "../map/ZigZagMap";
import './Test.css';
import assets from "../components/assets";

const TestB = () => {

    return <>
        <h1>Test Page B (ZigZag)</h1>
        <Canvas>
            <GameDisplay game={new Game(new ZigZagMap())} assets={assets} />
        </Canvas>
    </>
}

export default TestB;

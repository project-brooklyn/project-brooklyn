import GamePage from "../components/GamePage";
import MazeMap from "../map/MazeMap";
import RandomMap from "../map/RandomMap";
import RectangleMap from "../map/RectangleMap";
import ZigZagMap from "../map/ZigZagMap";
import './Test.css'

export const TestA = () => <GamePage gameMap={RandomMap} />
export const TestB = () => <GamePage gameMap={ZigZagMap} />
export const TestC = () => <GamePage gameMap={MazeMap} />
export const TestD = () => <GamePage gameMap={RectangleMap} />

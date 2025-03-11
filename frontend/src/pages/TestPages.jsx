import GamePage from "../components/GamePage";
import FlatMap from "../map/FlatMap";
import BigMap from "../map/BigMap";
import MazeMap from "../map/MazeMap";
import RandomMap from "../map/RandomMap";
import RectangleMap from "../map/RectangleMap";
import ZigZagMap from "../map/ZigZagMap";

export const Test0 = () => <GamePage gameMap={FlatMap} />
export const TestA = () => <GamePage gameMap={RandomMap} />
export const TestB = () => <GamePage gameMap={ZigZagMap} />
export const TestC = () => <GamePage gameMap={MazeMap} />
export const TestD = () => <GamePage gameMap={RectangleMap} />
export const TestE = () => <GamePage gameMap={BigMap} />

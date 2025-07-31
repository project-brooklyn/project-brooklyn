import GamePage from "../components/game/GamePage";
import FlatMap from "../map/FlatMap";
import BigMap from "../map/BigMap";
import MazeMap from "../map/MazeMap";
import RandomMap from "../map/RandomMap";
import RectangleMap from "../map/RectangleMap";
import ZigZagMap from "../map/ZigZagMap";
import TwinPeaksMap from "../map/TwinPeaksMap";
import { tutorial } from "../scenarios/tutorial";

export const Flat = () => <GamePage gameMap={FlatMap} />
export const Random = () => <GamePage gameMap={RandomMap} />
export const ZigZag = () => <GamePage gameMap={ZigZagMap} />
export const Maze = () => <GamePage gameMap={MazeMap} />
export const Rectangle = () => <GamePage gameMap={RectangleMap} />
export const Big = () => <GamePage gameMap={BigMap} />
export const TwinPeaks = () => <GamePage gameMap={TwinPeaksMap} />
export const Tutorial = () => <GamePage gameMap={FlatMap} levels={tutorial} />

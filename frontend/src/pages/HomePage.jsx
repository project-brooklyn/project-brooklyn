import GamePage from "../components/game/GamePage";
import DemoMap from "../map/DemoMap";

const HomePage = () => {
    return <GamePage gameMap={DemoMap} devMode={false} />
};

export default HomePage;

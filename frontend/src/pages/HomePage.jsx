import GamePage from "../components/GamePage";
import DemoMap from "../map/DemoMap";

const HomePage = () => {
    return <GamePage gameMap={DemoMap} devMode={false} />
};

export default HomePage;

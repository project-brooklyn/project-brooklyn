import { Canvas } from "@react-three/fiber";
import { useAuth } from "../AuthContext";
import Game from "../Game";
import FiberDisplay from "../components/FiberDisplay";
import { levels } from "../levels";
import { useState } from "react";
import DemoMap from "../map/DemoMap";
import RandomMap from "../map/RandomMap";

const HomePage = () => {
    const { user, logout } = useAuth();
    const [enemies, setEnemies] = useState([]);
    const game = new Game(new DemoMap(), setEnemies);
    const goToDefend = () => {
        game.level++;
        game.spawnEnemies(levels[game.level]);
    }

    return (<>
        {user ? `You are logged in as ${user.username}` : 'You are not logged in'}
        { 
            user ? 
                <div>
                    <p onClick={logout}>Log Out</p>
                </div>
            :
                <div>
                    <a href="/signup">Sign Up</a>
                    <a href="/login">Log In</a>
                </div>
        }
        <h1>Project Broolyn</h1>
        {game.phase === 'build' && <button onClick={goToDefend}>
            Start
        </button>}
        <Canvas>
            <FiberDisplay gameMap={game.gameMap} enemies={enemies} />
        </Canvas>
    </>)
};

export default HomePage;

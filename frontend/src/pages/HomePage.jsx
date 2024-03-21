import { useAuth } from "../AuthContext";
import GameCanvas from "../components/GameCanvas";
import Game from "../Game";

import DemoMap from "../map/DemoMap";
import RandomMap from "../map/RandomMap";
import ZigZagMap from "../map/ZigZagMap";
import MazeMap from "../map/MazeMap";

const HomePage = () => {
    const { user, logout } = useAuth();
    const game = new Game(new MazeMap());

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
        
        <h1>Project Brooklyn</h1>
        <GameCanvas game={game} />
    </>)
};

export default HomePage;

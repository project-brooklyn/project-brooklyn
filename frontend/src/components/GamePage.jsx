import { Canvas } from "@react-three/fiber";
import { Stats } from '@react-three/drei';
import { useAuth } from "../AuthContext";
import Game from "../Game";
import GameDisplay from "../components/GameDisplay";
import assets from "../components/assets";

const GamePage = ({gameMap}) => {
    const { user, logout } = useAuth();
    const game = new Game(new gameMap());

    return (<>
        <TopBar user={user} logout={logout} />
        <GameContainer game={game} />
    </>)
}

const TopBar = ({user, logout}) => {
    return (<div style={{display: 'flex', justifyContent: 'space-around'}}>
        <h1>Project Brooklyn</h1>
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <div>
                {user ? <p>You are logged in as ${user.username}</p> : <p>You are not logged in</p>}
            </div>
            <div>
            { 
                user ? 
                    <p onClick={logout}>Log Out</p>
                :
                    <p>
                        <a href="/signup">Sign Up</a>
                        {" | "}
                        <a href="/login">Log In</a>
                    </p>
            }
            </div>
        </div>
    </div>)
}

const GameContainer = ({game}) => {
    return <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
        <div style={{border: "2px solid blue", height: "80vh", aspectRatio: "16/9"}}>
            <Stats showPanel={0} className="stats" />
            <Canvas>
                <GameDisplay game={game} assets={assets} />
            </Canvas>
        </div>
        <h6>Footer</h6>
    </div>
}

export default GamePage;

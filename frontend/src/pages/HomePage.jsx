import { useAuth } from "../AuthContext";
import { Canvas } from "@react-three/fiber";
import GameCanvas from "../components/GameCanvas";
import { Stats } from '@react-three/drei';
import Game from "../Game";

import DemoMap from "../map/DemoMap";

const HomePage = () => {
    const { user, logout } = useAuth();
    const game = new Game(new DemoMap());

    return (<>
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-end'}}>
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
        
        <h1>Project Brooklyn</h1>
        <Stats showPanel={0} className="stats" />
        <Canvas>
            <GameCanvas game={game} />
        </Canvas>
    </>)
};

export default HomePage;

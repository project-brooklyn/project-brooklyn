import { useAuth } from "../AuthContext";
import { Canvas } from "@react-three/fiber";
import GameDisplay from "../components/GameDisplay";
import { Stats } from '@react-three/drei';
import Game from "../Game";

import DemoMap from "../map/DemoMap";
import GeometryManager from "../components/GeometryManager";
import MaterialManager from "../components/MaterialManager";

const HomePage = () => {
    const { user, logout } = useAuth();
    const game = new Game(new DemoMap());

    const assets = {
        geometryManager: new GeometryManager(),
        materialManager: new MaterialManager(),
    }

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
            <GameDisplay game={game} assets={assets} />
        </Canvas>
    </>)
};

export default HomePage;

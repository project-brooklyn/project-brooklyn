import { Canvas } from "@react-three/fiber";
import { Stats } from '@react-three/drei';
import { useAuth } from "../AuthContext";
import Game from "../Game";
import GameDisplay from "../components/GameDisplay";
import assets from "../components/assets";
import WelcomeModal from "./ui/WelcomeModal";
import { useState } from "react";

const GamePage = ({gameMap, showWelcome = false}) => {
    const { user, logout } = useAuth();
    const game = new Game(new gameMap());

    const [showModal, setShowModal] = useState(showWelcome);

    return (<>
        <WelcomeModal
          show={showModal}
          onHide={() => setShowModal(false)}
        />
        <TopBar user={user} logout={logout} />
        <GameContainer game={game} />
    </>)
}

const TopBar = ({user, logout}) => {
    return (<div style={{display: 'flex', justifyContent: 'space-around'}}>
        <div>
            <h1>Project Brooklyn</h1>
            <h2>A tower defense game</h2>
        </div>
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', alignSelf: 'center'}}>
            <div>
                {user ? <p>You are logged in as {user.username}</p> : <p>You are not logged in</p>}
            </div>
            <div>
            {
                user ?
                    <p style={{color: 'blue'}} onClick={logout}>Log Out</p>
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
        <h6>© 2024, BK Studios.</h6>
    </div>
}

export default GamePage;

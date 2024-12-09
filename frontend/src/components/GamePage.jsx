import { Canvas } from "@react-three/fiber";
import { Stats } from '@react-three/drei';
import { useAuth } from "../AuthContext";
import Game from "../Game";
import GameDisplay from "../components/GameDisplay";
import assets from "../components/assets";
import WelcomeModal from "./ui/WelcomeModal";
import { useState } from "react";
import { HtmlUI } from "./ui/HtmlUI";


const GamePage = ({gameMap, showWelcome = false}) => {
    const { user, logout } = useAuth();
    const game = new Game(new gameMap());

    const [showModal, setShowModal] = useState(showWelcome);

    return (<div className="d-flex flex-column bg-secondary vh-100">
        <WelcomeModal
          show={showModal}
          onHide={() => setShowModal(false)}
        />
        <TopBar user={user} logout={logout} />
        <GameContainer game={game} />
    </div>)
}

const TopBar = ({user, logout}) => {
    return (<div className="d-flex justify-content-around">
        <div className="">
            <h1>Project Brooklyn</h1>
            <h2>A tower defense game</h2>
        </div>
        <div className="d-flex flex-column justify-content-center align-items-center">
            <div>
                {user ? <p>You are logged in as {user.username}</p> : <p>You are not logged in</p>}
            </div>
            <div>
            {
                user ?
                    <p className="text-primary" onClick={logout}>Log Out</p>
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
    const [selectedTower, setSelectedTower] = useState(null);

    return <div className="d-flex flex-column align-items-center flex-grow-1">
        <div className="d-flex flex-grow-1 w-100">
            <div className="w-75 border border-2 border-primary m-2">
                <Stats showPanel={0} />
                <Canvas>
                    <GameDisplay game={game} assets={assets} selectedTower={selectedTower} />
                </Canvas>
            </div>
            <HtmlUI
                game={game}
                phase={game.phase}
                selectedTower={selectedTower}
                setSelectedTower={setSelectedTower}
            />
        </div>
        <h6 className="position-absolute bottom-0 w-100 text-center">© 2024, BK Studios.</h6>
    </div>
  
}

export default GamePage;

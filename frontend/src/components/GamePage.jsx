import { Canvas } from "@react-three/fiber";
import { Stats } from '@react-three/drei';
import { useAuth } from "../AuthContext";
import Game, { BUILD } from "../Game";
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
        <div style={{display: "flex", height: "80vh"}} >
            <div style={{border: "2px solid blue", aspectRatio: "4/3"}}>
                <Stats showPanel={0} className="stats" />
                <Canvas>
                    <GameDisplay game={game} assets={assets} />
                </Canvas>
            </div>
            <HtmlUI game={game} phase={game.phase}/>
        </div>
        <h6>© 2024, BK Studios.</h6>
    </div>
}

export default GamePage;

const HtmlUI = ({game}) => {
    const [level, setLevel] = useState(game.level);
    const [gold, setGold] = useState(game.gold);
    const [phase, setPhase] = useState(game.phase);

    setInterval(() => {
        setLevel(game.level);
        setGold(game.gold);
        setPhase(game.phase);
    }, 100); // substiture for useFrame, which can't be used outside Canvas

    return <div style={{width: "20vw", border: "2px solid red", display: "flex", flexDirection: "column"}}>
        <div style={{display: "flex", justifyContent: "space-between"}}>
            <span>{`Level: ${level}`}</span>
            <span>{`Gold: ${gold}`}</span>
            <span>{`Phase: ${phase.toUpperCase()}`}</span>
        </div>


        {phase === BUILD && <div style={{display: "flex", justifyContent: "center", marginTop: "auto", marginBottom: "40px"}}>
            <button onClick={game.startDefendPhase}>START NEXT LEVEL</button>
        </div>}
    </div>
}

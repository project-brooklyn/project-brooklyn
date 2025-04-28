import { Canvas } from "@react-three/fiber";
// import { useAuth } from "../AuthContext";
import Game, { BUILD, SCORE, WIN, LOSE } from "../Game";
import GameDisplay from "../components/GameDisplay";
import assets from "../components/assets";
import WelcomeModal from "./ui/WelcomeModal";
import { useEffect, useState } from "react";
import { HtmlUI } from "./ui/HtmlUI";
import ScorePhaseModal from "./ui/ScorePhaseModal";
import LoseModal from "./ui/LoseModal";
import WinModal from "./ui/WinModal";
import { Howl, Howler } from 'howler';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Stack from "@mui/material/Stack";

const NAME = "GamePage";

const GamePage = ({ gameMap, devMode = true }) => {
    // const { user, logout } = useAuth();
    const [game, setGame] = useState(() => new Game(new gameMap()));

    const [showWelcomeModal, setShowWelcomeModal] = useState(!devMode);
    const [showGameModal, setShowGameModal] = useState("");
    const [showDevGui, _setShowDevGui] = useState(devMode);

    useEffect(() => {
        game.addPhaseListener(SCORE, () => setShowGameModal(SCORE))
        game.addPhaseListener(BUILD, () => setShowGameModal(BUILD))
        game.addPhaseListener(WIN, () => setShowGameModal(WIN))
        game.addPhaseListener(LOSE, () => setShowGameModal(LOSE))
        return () => {
            game.removeAllPhaseListeners(SCORE);
            game.removeAllPhaseListeners(BUILD);
            game.removeAllPhaseListeners(WIN);
            game.removeAllPhaseListeners(LOSE);
        }
    }, [game])

    useEffect(() => {
        if (showDevGui) {
            game.devGui.show();
        } else {
            game.devGui.hide();
        }
    }, [game.devGui, showDevGui])

    const startMusicAndHideModal = () => {
        Howler.volume(0.5);
        const sound = new Howl({
            src: ['audio/funkysuspense.mp3']
        });
        sound.play();

        setShowWelcomeModal(false)
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Project Brooklyn: A tower defense game
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>

            {showWelcomeModal &&
                <WelcomeModal
                    hideModal={startMusicAndHideModal}
                    setGame={setGame}
                />
            }
            {(showGameModal === SCORE) && <ScorePhaseModal game={game} />}
            {(showGameModal === WIN) &&
                <WinModal
                    game={game}
                    onHide={() => { setShowGameModal("") }}
                />
            }
            {(showGameModal === LOSE) &&
                <LoseModal
                    game={game}
                    onHide={() => { setShowGameModal("") }}
                />
            }

            <Stack sx={{ height: "95vh" }} >
                <GameContainer game={game} />
            </Stack>

            <Typography variant="h7" component="div" sx={{ textAlign: "center" }}>
                © 2025, BK Studios
            </Typography>
        </Box >
    )
}

const TopBar = ({ user, logout }) => {
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
                {user
                    ? <p className="text-primary" onClick={logout}>
                        Log Out
                    </p>
                    : <p>
                        <a href="/signup">Sign Up</a>
                        {" | "}
                        <a href="/login">Log In</a>
                    </p>
                }
            </div>
        </div>
    </div>)
}

const GameContainer = ({ game }) => {
    const [selectedTower, setSelectedTower] = useState(null);
    const { mouseInput } = game;

    useEffect(() => {
        if (!game.devGui) return;
        const gameFolder = game.devGui.addFolder("Game");
        gameFolder.add(game, "level", 1, 12, 1);
        gameFolder.add(game.castle, "hp", 1, game.castle.maxHp, 1).name("base hp");
        gameFolder.close()
        return () => {
            gameFolder.destroy();
        }
    }, [game])

    useEffect(() => {
        mouseInput.addClickCallback(NAME, (x, y, _z) => {
            const tower = game.getTower(x, y);
            if (!tower) return;

            setSelectedTower(current => {
                // if the tower is currentlyselected, deselect it
                // otherwise, select the tower
                return tower === current ? null : tower;
            });
        })

        return () => mouseInput.removeClickCallback(NAME);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <Stack direction="row" spacing={2} height="100%">
            <Canvas shadows >
                <GameDisplay game={game} assets={assets} selectedTower={selectedTower} />
            </Canvas>
            <HtmlUI
                game={game}
                phase={game.phase}
                selectedTower={selectedTower}
                setSelectedTower={setSelectedTower}
            />
        </Stack>
    )
}

export default GamePage;

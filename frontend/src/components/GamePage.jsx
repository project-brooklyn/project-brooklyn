import { Canvas } from "@react-three/fiber";
// import { useAuth } from "../AuthContext";
import Game, { BUILD, DEFEND, SCORE, WIN, LOSE } from "../Game";
import { TOWERS } from "../entities/buildables";
import { Status as TowerStatus } from "../entities/towers/Tower";
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
import Fab from "@mui/material/Fab";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import DeleteIcon from '@mui/icons-material/Delete';
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';
import Container from "@mui/material/Container";
import BuyModal from "./ui/BuyModal";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const NAME = "GamePage";
const BUY_KEY = "b";

const GamePage = ({ gameMap, devMode = true }) => {
    // const { user, logout } = useAuth();
    const [game, setGame] = useState(() => new Game(new gameMap()));
    const { keyboardInput, undoManager } = game;

    const [showWelcomeModal, setShowWelcomeModal] = useState(!devMode);
    const [showGameModal, setShowGameModal] = useState(game.phase);
    const [showDevGui, _setShowDevGui] = useState(devMode);

    const [selectedTower, setSelectedTower] = useState(null);
    const [showBuyModal, setShowBuyModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);

    const handleErrorClose = () => {
        setErrorMessage(null);
    }

    useEffect(() => {
        game.addPhaseListener(BUILD, () => setShowGameModal(BUILD))
        game.addPhaseListener(SCORE, () => setShowGameModal(SCORE))
        game.addPhaseListener(DEFEND, () => setShowGameModal(DEFEND))
        game.addPhaseListener(WIN, () => setShowGameModal(WIN))
        game.addPhaseListener(LOSE, () => setShowGameModal(LOSE))

        keyboardInput.addKeyDownCallback(BUY_KEY, NAME, () => {
            if (game.phase === BUILD) {
                setShowBuyModal(true);
            }
        })

        return () => {
            game.removeAllPhaseListeners(BUILD);
            game.removeAllPhaseListeners(DEFEND);
            game.removeAllPhaseListeners(SCORE);
            game.removeAllPhaseListeners(WIN);
            game.removeAllPhaseListeners(LOSE);
        }
    }, [game, keyboardInput])

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

    const disableSellButton = !selectedTower || selectedTower.status !== TowerStatus.BUILT;

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

            <Snackbar
                open={Boolean(errorMessage)}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                autoHideDuration={3000}
                onClose={handleErrorClose}
            >
                <Alert
                    onClose={handleErrorClose}
                    severity="error"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    {errorMessage}
                </Alert>
            </Snackbar>

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
                <GameContainer game={game} selectedTower={selectedTower} setSelectedTower={setSelectedTower} />
            </Stack>

            <Container sx={{ position: "absolute", bottom: "75px", textAlign: "center" }}>
                <Stack direction="row" spacing={2} sx={{ justifyContent: "center" }}>
                    <Fab
                        aria-label="buy-button"
                        variant="extended"
                        color="primary"
                        disabled={showGameModal !== BUILD}
                        onClick={() => setShowBuyModal(true)}
                    >
                        <ShoppingCartIcon sx={{ mr: 1 }} /> Buy (B)
                    </Fab>
                    <Fab
                        aria-label="sell-button"
                        variant="extended"
                        color="error"
                        disabled={disableSellButton}
                        onClick={() => { sellTower(game, selectedTower, setSelectedTower) }}
                    >
                        <DeleteIcon sx={{ mr: 1 }} /> Sell {selectedTower?.price && `($${selectedTower?.price / 2})`}
                    </Fab>
                    <Fab
                        aria-label="undo-button"
                        variant="extended"
                        disabled={showGameModal !== BUILD}  // TODO: fix refresh issue (!undoManager.hasUndos())
                        onClick={undoManager.undo}
                    >
                        <UndoIcon sx={{ mr: 1 }} /> Undo
                    </Fab>
                    <Fab
                        aria-label="redo-button"
                        variant="extended"
                        disabled={showGameModal !== BUILD}  // TODO: fix refresh issue (!undoManager.hasRedos())
                        onClick={undoManager.redo}
                    >
                        <RedoIcon sx={{ mr: 1 }} /> Redo
                    </Fab>
                    <Fab
                        aria-label="start-button"
                        variant="extended"
                        color="info"
                        disabled={showGameModal !== BUILD}
                        onClick={() => game.setPhase(DEFEND)}
                    >
                        Start Next Level
                    </Fab>
                </Stack>
            </Container>

            <BuyModal
                open={showBuyModal}
                setOpen={setShowBuyModal}
                game={game}
                setSelectedTower={setSelectedTower}
                setErrorMessage={setErrorMessage}
            />

            <Typography variant="h7" component="div" sx={{ textAlign: "center" }}>
                © 2025, BK Studios
            </Typography>
        </Box >
    )
}

const sellTower = (game, selectedTower, setSelectedTower) => {
    game.removeTower(selectedTower.x, selectedTower.y);

    const t = TOWERS.get(selectedTower.name);
    game.gold += 0.5 * t.price;
    game.setPath();
    setSelectedTower(null);
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

const GameContainer = ({ game, selectedTower, setSelectedTower }) => {
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
                // if the tower is currently selected, deselect it
                // otherwise, select the tower
                return tower === current ? null : tower;
            });
        })

        return () => mouseInput.removeClickCallback(NAME);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (<>
        <Stack direction="row" spacing={2} height="100%">
            <Stack width="100%">
                <Canvas shadows >
                    <GameDisplay game={game} assets={assets} selectedTower={selectedTower} />
                </Canvas>
            </Stack>
            <HtmlUI
                game={game}
                phase={game.phase}
                selectedTower={selectedTower}
                setSelectedTower={setSelectedTower}
            />
        </Stack>
    </>
    )
}

export default GamePage;

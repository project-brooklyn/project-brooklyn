import { Canvas } from "@react-three/fiber";
import Game, { BUILD, SCORE, WIN, LOSE, DEFEND } from "../Game";
import GameDisplay from "../components/GameDisplay";
import assets from "../components/assets";
import WelcomeModal from "./ui/WelcomeModal";
import { useEffect, useState } from "react";
import { SideHUD } from "./ui/SideHUD";
import ScorePhaseModal from "./ui/ScorePhaseModal";
import LoseModal from "./ui/LoseModal";
import WinModal from "./ui/WinModal";
import { Howl, Howler } from 'howler';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
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
import Drawer from '@mui/material/Drawer';
import { List, ListItem, ListItemText } from '@mui/material';
import { styled } from '@mui/material/styles';
import { jwtDecode } from 'jwt-decode';
import { TOWERS } from "../entities/buildables";
import { Status as TowerStatus } from "../entities/towers/Tower";
import axios from "axios";
import { deleteSave } from "../utils/api_utils";
import { GameProvider } from "./GameProvider";
import { useGameContext } from "./GameContext";

const NAME = "GamePage";
const BUY_KEY = "b";

const HudTopDiv = styled('div')(({ theme }) => ({
    ...theme.typography.button,
    color: "white",
    fontSize: "medium",
}));

const GamePage = ({ gameMap, devMode = true }) => {
    const [game, setGame] = useState(() => new Game(new gameMap()));
    const { keyboardInput, undoManager } = game;

    const [showWelcomeModal, setShowWelcomeModal] = useState(!devMode);
    const [showGameModal, setShowGameModal] = useState(game.phase);
    const [showDevGui, _setShowDevGui] = useState(devMode);
    const [username, setUsername] = useState(null);
    const [drawerOpen, setDrawerOpen] = useState(false);

    const [selectedTower, setSelectedTower] = useState(null);
    const [showBuyModal, setShowBuyModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);

    const handleErrorClose = () => {
        setErrorMessage(null);
    }

    const deleteCurrentGame = async () => {
        const token = localStorage.getItem('project-bk-token');
        if (token) {
            const decoded = jwtDecode(token);
            const { userId } = decoded;
            await deleteSave(userId, game.createdAt);
        }
    }

    useEffect(() => {
        game.addPhaseListener(BUILD, () => setShowGameModal(BUILD))
        game.addPhaseListener(SCORE, () => setShowGameModal(SCORE))
        game.addPhaseListener(DEFEND, () => setShowGameModal(DEFEND))
        game.addPhaseListener(WIN, () => setShowGameModal(WIN))
        game.addPhaseListener(LOSE, () => setShowGameModal(LOSE))
        game.addPhaseListener(WIN, deleteCurrentGame)
        game.addPhaseListener(LOSE, deleteCurrentGame)

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

    useEffect(() => {
        const getUser = async () => {
            const token = localStorage.getItem('project-bk-token');
            if (token) {
                const decoded = jwtDecode(token);
                const { userId } = decoded;
                const user = await axios.get((import.meta.env.VITE_BACKEND_URI || 'http://localhost:5000') + '/api/user/' + userId);
                setUsername(user.data.username);
            }
        }

        getUser();
    }, []);

    const hideGameModel = () => {
        setShowGameModal("");
    }

    const startMusicAndHideModal = () => {
        Howler.volume(0.5);
        const sound = new Howl({
            src: ['audio/funkysuspense.mp3']
        });
        sound.play();

        setShowWelcomeModal(false)
    }

    const disableSellButton = (showGameModal !== BUILD) || !selectedTower || (selectedTower.status !== TowerStatus.BUILT);

    return (
        <GameProvider game={game} >
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static" >
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                            onClick={() => {
                                setDrawerOpen(!drawerOpen);
                            }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            Project Brooklyn: A tower defense game
                        </Typography>
                        {username && <p>Hello {username}!</p>}
                    </Toolbar>
                </AppBar>
                <Drawer
                    anchor="left"
                    open={drawerOpen}
                    onClose={() => setDrawerOpen(false)}
                >
                    <List sx={{ marginTop: "100px" }}>
                        <ListItem component="a" href="/login">
                            <ListItemText primary="Log In" />
                        </ListItem>
                        <ListItem component="a" href="/signup">
                            <ListItemText primary="Sign Up" />
                        </ListItem>
                    </List>
                </Drawer>

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
                {(showGameModal === SCORE) && <ScorePhaseModal />}
                {(showGameModal === WIN) && <WinModal onHide={hideGameModel} />}
                {(showGameModal === LOSE) && <LoseModal onHide={hideGameModel} />}

                <Container sx={{ position: "absolute", top: "75px", textAlign: "center", zIndex: "1" }}>
                    <Stack direction="row" sx={{ justifyContent: "space-between" }}>
                        <HudTopDiv>{`Level: ${game.level}`}</HudTopDiv>
                        <HudTopDiv>{`Gold: ${game.gold}`}</HudTopDiv>
                        <HudTopDiv>{`Phase: ${game.phase.toUpperCase()}`}</HudTopDiv>
                    </Stack>
                </Container>

                <Stack sx={{ height: "95vh" }} >
                    <GameContainer key={game} selectedTower={selectedTower} setSelectedTower={setSelectedTower} />
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
                    setSelectedTower={setSelectedTower}
                    setErrorMessage={setErrorMessage}
                />

                <Typography variant="h7" component="div" sx={{ textAlign: "center" }}>
                    © 2025, BK Studios
                </Typography>
            </Box >
        </GameProvider>
    )
}

const sellTower = (game, selectedTower, setSelectedTower) => {
    game.removeTower(selectedTower.x, selectedTower.y);

    const t = TOWERS.get(selectedTower.name);
    game.gold += 0.5 * t.price;
    game.setPath();
    setSelectedTower(null);
}

const GameContainer = ({ selectedTower, setSelectedTower }) => {
    const game = useGameContext();
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
                    <GameDisplay assets={assets} selectedTower={selectedTower} />
                </Canvas>
            </Stack>
            <SideHUD selectedTower={selectedTower} />
        </Stack>
    </>
    )
}

export default GamePage;

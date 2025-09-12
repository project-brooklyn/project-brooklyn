import Game, { BUILD, SCORE, WIN, LOSE, DEFEND } from "../../Game";
import { useEffect, useState } from "react";
import WelcomeModal from "../ui/WelcomeModal";
import ScorePhaseModal from "../ui/ScorePhaseModal";
import LoseModal from "../ui/LoseModal";
import WinModal from "../ui/WinModal";
import SettingsModal from "../ui/SettingsModal";
import MessageModal from "../ui/MessageModal";
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
import SettingsIcon from '@mui/icons-material/Settings';
import Container from "@mui/material/Container";
import BuyModal from "../ui/BuyModal";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Drawer from '@mui/material/Drawer';
import { List, ListItem, ListItemText } from '@mui/material';
import { styled } from '@mui/material/styles';
import { jwtDecode } from 'jwt-decode';
import { TOWERS } from "../../entities/buildables";
import { Status as TowerStatus } from "../../entities/towers/Tower";
import { deleteSave, getUsername } from "../../utils/api_utils";
import { GameProvider } from "./GameProvider";
import GameContainer from "./GameContainer";
import { useGameContext } from "./GameContext";

const NAME = "GamePage";
const BUY_KEY = "b";

const HudTopDiv = styled('div')(({ theme }) => ({
    ...theme.typography.button,
    color: "white",
    fontSize: "medium",
}));

const GamePage = ({ gameMap, devMode = true, levels }) => {
    const [game, setGame] = useState(() => new Game(new gameMap(), levels));
    const { keyboardInput } = game;

    const [modal, setModal] = useState(devMode ? "" : "WELCOME");

    const hideModal = () => setModal("");
    const startMusicAndHideModal = () => {
        Howler.volume(0.5);
        const sound = new Howl({
            src: ['audio/funkysuspense.mp3']
        });
        sound.play();

        hideModal();
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
        game.addPhaseListener(BUILD, () => setModal(game.message ? "MESSAGE" : ''));
        game.addPhaseListener(DEFEND, () => setModal(DEFEND)); // there is no modal for DEFEND, but this shows the phase in the HUD
        game.addPhaseListener(SCORE, () => setModal(SCORE));
        game.addPhaseListener(WIN, () => setModal(WIN));
        game.addPhaseListener(LOSE, () => setModal(LOSE));
        game.addPhaseListener(WIN, deleteCurrentGame);
        game.addPhaseListener(LOSE, deleteCurrentGame);

        keyboardInput.addKeyDownCallback(BUY_KEY, NAME, () => {
            if (game.phase === BUILD) {
                setModal("BUY");
            }
        })

        return () => {
            game.removeAllPhaseListeners(BUILD);
            game.removeAllPhaseListeners(DEFEND);
            game.removeAllPhaseListeners(SCORE);
            game.removeAllPhaseListeners(WIN);
            game.removeAllPhaseListeners(LOSE);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [game])

    // Set the game phase to BUILD to show message
    useEffect(() => {
        game.setPhase(BUILD);
    }, [game.message]);

    const [selectedTower, setSelectedTower] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);

    return (
        <GameProvider game={game} >
            {/* All Modals */}
            <WelcomeModal
                show={modal === "WELCOME"}
                hideModal={startMusicAndHideModal}
                setGame={setGame}
            />
            <MessageModal
                show={modal === "MESSAGE"}
                hideModal={hideModal}
            />
            <ScorePhaseModal show={modal === SCORE} />
            <WinModal hideModal={hideModal} show={modal === WIN} />
            <LoseModal hideModal={hideModal} show={modal === LOSE} />
            <BuyModal
                show={modal === "BUY"}
                hideModal={hideModal}
                setSelectedTower={setSelectedTower}
                setErrorMessage={setErrorMessage}
            />

            <Box sx={{ flexGrow: 1 }}>
                <TopBar errorMessage={errorMessage} setErrorMessage={setErrorMessage} devMode={devMode} />

                {/* TOP HUD INFO */}
                {/* TODO: Make game reactive so this updates properly */}
                <Container sx={{ position: "absolute", top: "75px", textAlign: "center", zIndex: "1" }}>
                    <Stack direction="row" sx={{ justifyContent: "space-between" }}>
                        <HudTopDiv>{`Level: ${game.level}`}</HudTopDiv>
                        <HudTopDiv>{`Gold: ${game.gold}`}</HudTopDiv>
                        <HudTopDiv>{`Phase: ${game.phase.toUpperCase()}`}</HudTopDiv>
                    </Stack>
                </Container>

                <GameContainer key={game} selectedTower={selectedTower} setSelectedTower={setSelectedTower} />

                <BottomButtons game={game} modal={modal} setModal={setModal} selectedTower={selectedTower} setSelectedTower={setSelectedTower} />

                <Typography variant="h7" component="div" sx={{ textAlign: "center" }}>
                    © 2025, BK Studios
                </Typography>
            </Box >
        </GameProvider>
    )
}

const TopBar = ({ errorMessage, setErrorMessage, devMode }) => {
    const game = useGameContext();
    const [drawerOpen, setDrawerOpen] = useState(false);
    const handleErrorClose = () => {
        setErrorMessage(null);
    }
    const [showDevGui, _setShowDevGui] = useState(devMode);
    const [showSettings, setShowSettings] = useState(false);
    useEffect(() => {
        if (showDevGui) {
            game.devGui.show();
        } else {
            game.devGui.hide();
        }
    }, [game.devGui, showDevGui])

    const [username, setUsername] = useState('');
    useEffect(() => {
        const getUser = async () => {
            const username = await getUsername();
            setUsername(username);
        }

        getUser();
    }, []);

    return <>
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
                <IconButton
                    size="large"
                    color="inherit"
                    onClick={() => setShowSettings(true)}
                >
                    <SettingsIcon />
                </IconButton>
                {<p>Hello {username || 'Guest'}!</p>}
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

        <SettingsModal
            show={showSettings}
            hideModal={() => setShowSettings(false)}
        />

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
    </>
}

const BottomButtons = ({ modal, setModal, selectedTower, setSelectedTower }) => {
    const game = useGameContext();
    const { undoManager } = game;
    const sellTower = (game, selectedTower, setSelectedTower) => {
        game.removeTower(selectedTower.x, selectedTower.y);

        const t = TOWERS.get(selectedTower.name);
        game.gold += 0.5 * t.price;
        game.setPath();
        setSelectedTower(null);
    }

    const disableSellButton = (game.phase !== BUILD) || !selectedTower || (selectedTower.status !== TowerStatus.BUILT);

    return <Container sx={{ position: "absolute", bottom: "75px", textAlign: "center" }}>
        <Stack direction="row" spacing={2} sx={{ justifyContent: "center" }}>
            <Fab
                aria-label="buy-button"
                variant="extended"
                color="primary"
                disabled={!!modal || game.phase !== BUILD}
                onClick={() => setModal("BUY")}
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
                disabled={game.phase !== BUILD}  // TODO: fix refresh issue (!undoManager.hasUndos())
                onClick={undoManager.undo}
            >
                <UndoIcon sx={{ mr: 1 }} /> Undo
            </Fab>
            <Fab
                aria-label="redo-button"
                variant="extended"
                disabled={game.phase !== BUILD}  // TODO: fix refresh issue (!undoManager.hasRedos())
                onClick={undoManager.redo}
            >
                <RedoIcon sx={{ mr: 1 }} /> Redo
            </Fab>
            <Fab
                aria-label="start-button"
                variant="extended"
                color="info"
                disabled={!!modal || game.phase !== BUILD}
                onClick={() => game.setPhase(DEFEND)}
            >
                Start Next Level
            </Fab>
        </Stack>
    </Container>
}

export default GamePage;

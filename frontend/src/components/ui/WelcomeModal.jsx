import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import OpenInBrowserIcon from '@mui/icons-material/OpenInBrowser';
import Game from '../../Game';
import { useEffect, useState } from 'react';
import { getSavedGames } from '../../utils/api_utils';
import { jwtDecode } from 'jwt-decode';

function WelcomeModal({ show, hideModal, setGame }) {
    const [errorMessage, setErrorMessage] = useState('');
    const [userId, setUserId] = useState(null);
    const [cloudGames, setCloudGames] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('project-bk-token');
        if (token) {
            const decoded = jwtDecode(token);
            setUserId(decoded.userId);
        }
    }, []);

    const showCloudSaves = async () => {
        if (loading) return;
        setLoading(true);
        try {
            const games = await getSavedGames();
            setCloudGames(games);
        } catch (err) {
            console.error('Failed to load cloud saves:', err);
            setErrorMessage('Failed to load cloud saves. ' + err.message);
        }
        setLoading(false);
        setLoaded(true);
    }

    const loadGameFromClipboard = async (e) => {
        e.preventDefault();
        try {
            const clipboardData = await navigator.clipboard.readText();

            const game = Game.from(clipboardData);
            if (game.error) {
                setErrorMessage(game.error.message);
            } else {
                setGame(game);
                hideModal();
            }

        } catch (err) {
            console.error('Failed to load game:', err);
            setErrorMessage('Failed to load game from clipboard.' + err.message);
        }
    }

    const NoSavesRow = <TableRow>
        <TableCell colSpan="6" align="center">No cloud saves found.</TableCell>
    </TableRow>

    const CloudSaveRow = ({ gameSave }) => {
        const gameData = JSON.parse(atob(gameSave.data));
        const { createdAt, updatedAt, level, gold, castleHP } = gameData;

        return (<TableRow key={gameSave._id}>
            <TableCell>{level}</TableCell>
            <TableCell>{gold}</TableCell>
            <TableCell>{castleHP}</TableCell>
            <TableCell>{new Date(parseInt(createdAt)).toLocaleString()}</TableCell>
            <TableCell>{new Date(parseInt(updatedAt)).toLocaleString()}</TableCell>
            <TableCell>
                <Button
                    onClick={() => {
                        setGame(Game.from(gameSave.data));
                        hideModal();
                    }}
                >
                    <OpenInBrowserIcon />
                </Button>
            </TableCell>
        </TableRow>)
    }

    return (
        <Dialog
            open={show}
            maxWidth="sm"
            fullWidth
        >
            <DialogTitle>
                Mission Briefing
            </DialogTitle>

            <DialogContent>
                <DialogContentText sx={{ textAlign: 'center' }}>
                    Your enemy seeks the quickest path to victory.<br />
                    Alter their trajectory.
                    Bring forth their defeat.

                    {loaded && (
                        <TableContainer component={Paper} style={{ marginTop: '20px' }}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Level</TableCell>
                                        <TableCell>Gold</TableCell>
                                        <TableCell>HP</TableCell>
                                        <TableCell>Game Started</TableCell>
                                        <TableCell>Game Saved</TableCell>
                                        <TableCell align="center">Actions</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {cloudGames.length ? cloudGames.map((game) => <CloudSaveRow gameSave={game} key={game._id} />) : NoSavesRow}
                                </TableBody>
                            </Table>
                        </TableContainer>)}
                    {errorMessage && <p className="text-danger">{errorMessage}</p>}
                </DialogContentText>
            </DialogContent>

            <DialogActions>
                {userId && <Button variant="contained" onClick={showCloudSaves} disabled={loading || loaded}>View Cloud Saves</Button>}
                <Button variant="contained" onClick={loadGameFromClipboard}>Load Game from Clipboard</Button>
                <Button variant="contained" onClick={hideModal}>New Game</Button>
            </DialogActions>
        </Dialog>
    );
}

export default WelcomeModal;

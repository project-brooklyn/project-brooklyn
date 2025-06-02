import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
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

    const NoSavesRow = <tr>
        <td colSpan="6" align="center">No cloud saves found.</td>
    </tr>

    const CloudSaveRow = ({ gameSave }) => {
        const gameData = JSON.parse(atob(gameSave.data));
        const { createdAt, updatedAt, level, gold, castleHP } = gameData;

        return (<tr key={gameSave._id}>
            <td>{level}</td>
            <td>{gold}</td>
            <td>{castleHP}</td>
            <td>{new Date(parseInt(createdAt)).toLocaleString()}</td>
            <td>{new Date(parseInt(updatedAt)).toLocaleString()}</td>
            <td>
                <Button
                    onClick={() => {
                        setGame(Game.from(gameSave.data));
                        hideModal();
                    }}
                >
                    Load Game
                </Button>
            </td>
        </tr>)
    }

    return (
        <Modal
            show={show}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                    Mission Briefing
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p align="center">
                    Your enemy seeks the quickest path to victory.<br />
                    Alter their trajectory.
                    Bring forth their defeat.
                </p>
                {loaded && (<table style={{ borderSpacing: '10px', borderCollapse: 'separate' }}>
                    <thead>
                        <tr>
                            <th>Level</th>
                            <th>Gold</th>
                            <th>Castle HP</th>
                            <th>Game Started</th>
                            <th>Game Saved</th>
                            <th>Load Game</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cloudGames.length ? cloudGames.map((game) => <CloudSaveRow gameSave={game} key={game._id} />) : NoSavesRow}
                    </tbody>
                </table>)}
                {errorMessage && <p className="text-danger">{errorMessage}</p>}
            </Modal.Body>
            <Modal.Footer>
                {userId && <Button onClick={showCloudSaves} disabled={loading || loaded}>View Cloud Saves</Button>}
                <Button onClick={loadGameFromClipboard}>Load Game from Clipboard</Button>
                <Button onClick={hideModal}>New Game</Button>
            </Modal.Footer>
        </Modal >
    );
}

export default WelcomeModal;

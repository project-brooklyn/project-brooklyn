import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useGameContext } from '../game/GameContext';

function WinModal({ show, onHide }) {
    const game = useGameContext();
    return (
        <Modal
            show={show}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                    Congratulations
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p align="center">
                    You won! <br />
                    <br />
                    Damage Dealt: {game.damage_dealt}<br />
                    Damage Taken: {game.damage_taken}<br />
                </p>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default WinModal;

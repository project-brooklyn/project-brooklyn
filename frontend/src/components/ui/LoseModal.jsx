import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useGameContext } from '../GameContext';

function LoseModal({ onHide }) {
    const game = useGameContext();
    return (
        <Modal
            show={true}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                    Game Over
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p align="center">
                    Your castle has fallen <br />
                    :( <br />
                    <br />
                    You made it to level {game.level - 1},
                    please try again.
                </p>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default LoseModal;

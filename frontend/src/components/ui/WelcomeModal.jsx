import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Game from '../../Game';

function WelcomeModal({ show, hideModal, setGame }) {
  const loadGame = async (e) => {
    e.preventDefault();
    try {
      const clipboardData = await navigator.clipboard.readText();
      console.log('Clipboard data:', clipboardData);

      const game = Game.from(clipboardData);
      setGame(game);
      hideModal();

    } catch (err) {
      console.error('Failed to load game:', err);
    }
  }

  return (
    <Modal
      {...{ show }}
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
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={loadGame}>Load Game from Clipboard</Button>
        <Button onClick={hideModal}>New Game</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default WelcomeModal;

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function WelcomeModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
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
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default WelcomeModal;

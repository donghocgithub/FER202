import { Modal, Button, Card } from 'react-bootstrap';

const SuccessModal = ({ show, onHide, userData }) => {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Sign Up Successful</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Card>
          <Card.Body>
            <h5 className="text-center text-success">Registration Successful!</h5>
            <p><strong>Email:</strong> {userData?.email}</p>
            <p className="text-muted">Welcome to our platform!</p>
          </Card.Body>
        </Card>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SuccessModal;

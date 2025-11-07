import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const MovieDetailModal = ({ show, onHide, movie }) => {
  if (!movie) return null;

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>{movie.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col md={4}>
            <img
              src={movie.poster}
              alt={movie.title}
              className="img-fluid rounded"
              style={{ width: '100%', height: 'auto' }}
            />
          </Col>
          <Col md={8}>
            <div className="mb-3">
              <Badge bg="info" className="text-dark me-2">{movie.genre}</Badge>
              <Badge bg="secondary me-2">{movie.year}</Badge>
              <Badge bg="outline-primary">{movie.country}</Badge>
            </div>
            
            <h6 className="mb-2">Description:</h6>
            <p className="mb-3">{movie.description}</p>
            
            <div className="mb-3">
              <h6 className="mb-2">Duration:</h6>
              <p className="mb-0">{movie.duration} minutes</p>
            </div>
            
            <div>
              <h6 className="mb-2">Showtimes:</h6>
              <div className="d-flex flex-wrap gap-2">
                {movie.showtimes.map((time, index) => (
                  <Badge key={index} bg="success" className="px-3 py-2">
                    {time}
                  </Badge>
                ))}
              </div>
            </div>
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default MovieDetailModal;

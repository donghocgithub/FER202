import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useMovieState, useMovieDispatch } from '../contexts/MovieContext';

const DeleteConfirmModal = ({ show }) => {
  const { movieToDelete } = useMovieState();
  const { confirmDelete, dispatch } = useMovieDispatch();

  const handleClose = () => {
    dispatch({ type: 'CLOSE_DELETE_MODAL' });
  };

  const handleConfirm = async () => {
    if (movieToDelete && movieToDelete.id) {
      await confirmDelete(movieToDelete.id);
    } else if (movieToDelete) {
      // If movieToDelete is just an id
      await confirmDelete(movieToDelete);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Xác nhận Xóa</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Bạn có chắc chắn muốn xóa phim này{movieToDelete && movieToDelete.title ? `: "${movieToDelete.title}"` : ''} không?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Hủy bỏ
        </Button>
        <Button variant="danger" onClick={handleConfirm}>
          Xác nhận Xóa
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteConfirmModal;

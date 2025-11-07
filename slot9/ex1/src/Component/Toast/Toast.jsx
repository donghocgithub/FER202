import React from 'react';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';

const CustomToast = ({ show, onClose, message, variant = 'success' }) => {
  return (
    <ToastContainer position="top-end" className="p-3">
      <Toast 
        show={show} 
        onClose={onClose} 
        delay={3000} 
        autohide
        bg={variant}
      >
        <Toast.Body className="text-white">
          {message}
        </Toast.Body>
      </Toast>
    </ToastContainer>
  );
};

export default CustomToast;

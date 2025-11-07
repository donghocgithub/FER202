import React, { useEffect } from 'react';

const Toast = ({ message, type, isVisible, onClose }) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 5000); 
      
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  const toastStyle = {
    position: 'fixed',
    top: '20px',
    right: '20px',
    padding: '12px 20px',
    borderRadius: '8px',
    color: 'white',
    fontWeight: 'bold',
    fontSize: '14px',
    zIndex: 9999,
    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
    transform: isVisible ? 'translateX(0)' : 'translateX(100%)',
    transition: 'transform 0.3s ease-in-out',
    cursor: 'pointer',
    backgroundColor: type === 'success' ? '#28a745' : '#dc3545'
  };

  return (
    <div style={toastStyle} onClick={onClose}>
      {message}
    </div>
  );
};

export default Toast;

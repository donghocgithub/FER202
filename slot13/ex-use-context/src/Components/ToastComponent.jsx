import React from 'react';
import { useToast } from '../contexts/ToastContext';

const ToastComponent = () => {
    const { toasts, removeToast } = useToast();

    // Hàm lấy màu theo type
    const getToastStyle = (type) => {
        switch (type) {
            case 'success':
                return {
                    backgroundColor: '#28a745',
                    color: 'white',
                    border: '1px solid #1e7e34'
                };
            case 'error':
                return {
                    backgroundColor: '#dc3545',
                    color: 'white',
                    border: '1px solid #bd2130'
                };
            case 'warning':
                return {
                    backgroundColor: '#ffc107',
                    color: '#212529',
                    border: '1px solid #d39e00'
                };
            case 'info':
            default:
                return {
                    backgroundColor: '#17a2b8',
                    color: 'white',
                    border: '1px solid #117a8b'
                };
        }
    };

    return (
        <div style={{
            position: 'fixed',
            top: '20px',
            right: '20px',
            zIndex: 9999,
            maxWidth: '300px'
        }}>
            {toasts.map(toast => {
                const style = getToastStyle(toast.type);
                
                return (
                    <div
                        key={toast.id}
                        style={{
                            ...style,
                            padding: '12px 16px',
                            marginBottom: '8px',
                            borderRadius: '4px',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                            cursor: 'pointer',
                            fontSize: '14px',
                            fontWeight: '500'
                        }}
                        onClick={() => removeToast(toast.id)}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span>{toast.message}</span>
                            <span style={{ marginLeft: '8px', fontSize: '16px' }}>×</span>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default ToastComponent;

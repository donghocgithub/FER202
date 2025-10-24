import React, { createContext, useState, useContext } from "react";

// Khởi tạo ToastContext với giá trị mặc định
export const ToastContext = createContext({
    toasts: [],
    addToast: () => {},
    removeToast: () => {}
});

// Tạo ToastProvider
export const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);

    // Hàm thêm toast mới
    const addToast = (message, type = 'info', duration = 3000) => {
        const id = Date.now() + Math.random(); // Tạo ID duy nhất
        const toast = { 
            id, 
            message, 
            type, 
            duration 
        };
        
        setToasts(prev => [...prev, toast]);
        
        // Tự động remove sau duration (milliseconds)
        setTimeout(() => {
            removeToast(id);
        }, duration);
    };

    // Hàm xóa toast
    const removeToast = (id) => {
        setToasts(prev => prev.filter(toast => toast.id !== id));
    };

    // Hàm xóa tất cả toast
    const clearAllToasts = () => {
        setToasts([]);
    };

    const contextValue = {
        toasts,
        addToast,
        removeToast,
        clearAllToasts
    };

    return (
        <ToastContext.Provider value={contextValue}>
            {children}
        </ToastContext.Provider>
    );
};

// Custom hook để sử dụng ToastContext
export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error("useToast must be used within a ToastProvider");
    }
    return context;
};

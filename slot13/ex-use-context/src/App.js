import React from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import { ToastProvider } from './contexts/ToastContext';
import CounterComponent from './Components/CounterComponent';
import LoginForm from './Components/LoginForm';
import LightSwitch from './Components/LightSwitch';
import ToastComponent from './Components/ToastComponent';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ToastProvider>
          <div style={{ 
            minHeight: '100vh', 
            transition: 'all 0.3s ease',
            backgroundColor: '#f8f9fa'
          }}>
            <CounterComponent />
            <LightSwitch />
            <LoginForm />
            <ToastComponent />
          </div>
        </ToastProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;

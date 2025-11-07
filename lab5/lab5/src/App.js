import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { MovieProvider } from './contexts/MovieContext';
import LoginPage from './components/LoginPage';
import MovieManager from './components/MovieManager';
import Header from './components/Header';
import { useAuthState } from './contexts/AuthContext';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuthState();
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  return children;
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <MovieProvider>
          <div className="App">
            <Header />
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route
                path="/movies"
                element={
                  <ProtectedRoute>
                    <MovieManager />
                  </ProtectedRoute>
                }
              />
              <Route path="/" element={<Navigate to="/movies" />} />
            </Routes>
          </div>
        </MovieProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import NavBar from './Component/NavBar/NavBar';
import HomePage from './Pages/HomePage';
import AccountPage from './Pages/AccountPage/AccountPage';
import FooterPage from './Pages/FooterPage/FooterPage';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const handleSearch = (searchTerm) => {
    console.log('Search term:', searchTerm);
    // Handle search logic here
  };

  const handleNavigation = (page) => {
    setCurrentPage(page);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'account':
        return <AccountPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="App">
      <NavBar onSearch={handleSearch} onNavigate={handleNavigation} />
      {renderPage()}
      <FooterPage />
    </div>
  );
}

export default App;

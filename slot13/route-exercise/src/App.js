import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './Components/Navigation';
import Home from './Components/Home';
import Products from './Components/Products';
import Contact from './Components/Contact';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navigation />
        <Routes>
          {/* Bài tập 1: Routing cơ bản */}
          <Route path="/" element={<Home />} />
          <Route path="/san-pham" element={<Products />} />
          <Route path="/lien-he" element={<Contact />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
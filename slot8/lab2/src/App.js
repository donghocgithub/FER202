import React, { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import Banner from './components/Banner/Banner';
import Menu from './components/Menu/Menu';
import Booking from './components/Booking/Booking';
import Footer from './components/Footer/Footer';
// Import ảnh cho menu
import image6 from './assets/image6.png';
import image7 from './assets/image7.png';
import image8 from './assets/image8.png';
import image9 from './assets/image9.png';

function App() {
  const [query, setQuery] = useState('');
  const menuItems = [
    {
      id: 1,
      title: "Margherita Pizza",
      price: 12.99,
      oldPrice: 15.99,
      tag: "SALE",
      img: image6
    },
    {
      id: 2,
      title: "Mushroom Pizza",
      price: 14.99,
      oldPrice: null,
      tag: null,
      img: image7
    },
    {
      id: 3,
      title: "Hawaiian Pizza",
      price: 16.99,
      oldPrice: null,
      tag: "NEW",
      img: image8
    },
    {
      id: 4,
      title: "Pesto Pizza",
      price: 18.99,
      oldPrice: 20.99,
      tag: "SALE",
      img: image9
    }
  ];
  const filteredItems = menuItems.filter(item =>
    item.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="App">
      <Navbar query={query} setQuery={setQuery} />
      <Banner />
      <section className="py-5" style={{backgroundColor: '#2c2c2c'}}>
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="display-5 fw-bold mb-3 text-white">Our Menu</h2>
          </div>
          <Menu items={filteredItems} />
        </div>
      </section>
      <section className="py-5" style={{backgroundColor: '#2c2c2c'}}>
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="display-5 fw-bold mb-3 text-white">Book Your Table</h2>
          </div>
          <Booking />
        </div>
      </section>
      <Footer/>
    </div>
  );
}

export default App;
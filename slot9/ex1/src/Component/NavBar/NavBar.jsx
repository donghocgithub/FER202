import React, { useState } from 'react';
import { Navbar, Nav, Form, Button, Dropdown, InputGroup, Container } from 'react-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './NavBar.css';

function NavBar({ onSearch, onNavigate }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  const handleQuickSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleNavClick = (page) => {
    onNavigate(page);
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="custom-navbar">
      <Container>
        <Navbar.Brand href="#home">
          <i className="bi bi-film me-2"></i>
          MovieHub
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {/* Navigation Links */}
          <Nav className="me-auto">
            <Nav.Link onClick={() => handleNavClick('home')}>
              <i className="bi bi-house me-1"></i>
              Home
            </Nav.Link>
            <Nav.Link onClick={() => handleNavClick('about')}>
              <i className="bi bi-info-circle me-1"></i>
              About
            </Nav.Link>
            <Nav.Link onClick={() => handleNavClick('contact')}>
              <i className="bi bi-envelope me-1"></i>
              Contact
            </Nav.Link>
          </Nav>

          {/* Search Form */}
          <Form className="d-flex me-3" onSubmit={handleSearch}>
            <InputGroup>
              <Form.Control
                type="text"
                placeholder="Quick search..."
                value={searchTerm}
                onChange={handleQuickSearch}
                className="search-input"
              />
              <Button variant="outline-light" type="submit">
                <i className="bi bi-search"></i>
              </Button>
            </InputGroup>
          </Form>

          {/* Right Side Icons */}
          <Nav className="ms-auto">
            {/* Accounts Dropdown */}
            <Dropdown className="me-3">
              <Dropdown.Toggle variant="outline-light" id="accounts-dropdown">
                <i className="bi bi-person-circle me-1"></i>
                Accounts
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => handleNavClick('manage-profiles')}>
                  <i className="bi bi-person-gear me-2"></i>
                  Manage Your Profiles
                </Dropdown.Item>
                <Dropdown.Item onClick={() => handleNavClick('account')}>
                  <i className="bi bi-person-plus me-2"></i>
                  Build your Account
                </Dropdown.Item>
                <Dropdown.Item onClick={() => handleNavClick('change-password')}>
                  <i className="bi bi-key me-2"></i>
                  Change Password
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            {/* Login */}
            <Nav.Link onClick={() => handleNavClick('login')} className="me-3">
              <i className="bi bi-box-arrow-in-right me-1"></i>
              Login
            </Nav.Link>

            {/* Favourites */}
            <Nav.Link onClick={() => handleNavClick('favourites')}>
              <i className="bi bi-heart me-1"></i>
              Favourites
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;

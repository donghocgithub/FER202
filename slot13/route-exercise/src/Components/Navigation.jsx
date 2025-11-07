import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

const Navigation = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
      <Container>
        <Navbar.Brand as={NavLink} to="/">
          React Router Exercise
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link 
              as={NavLink} 
              to="/" 
              className={({ isActive }) => isActive ? 'active' : ''}
            >
              Trang Chủ
            </Nav.Link>
            
            <Nav.Link 
              as={NavLink} 
              to="/san-pham"
              className={({ isActive }) => isActive ? 'active' : ''}
            >
              Sản Phẩm
            </Nav.Link>
            
            <Nav.Link 
              as={NavLink} 
              to="/lien-he"
              className={({ isActive }) => isActive ? 'active' : ''}
            >
              Liên Hệ
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;

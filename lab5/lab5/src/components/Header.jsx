import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { useAuthState, useAuthDispatch } from '../contexts/AuthContext';

const Header = () => {
  const { user } = useAuthState();
  const { logout } = useAuthDispatch();

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand>Movies JSON Server</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Nav>
            {user ? (
              <Nav.Item className="me-3">Xin chào, <strong>{user.username}</strong></Nav.Item>
            ) : (
              <Nav.Item className="me-3">Bạn chưa đăng nhập</Nav.Item>
            )}
            {user ? <Nav.Link onClick={logout}>Đăng xuất</Nav.Link> : null}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;

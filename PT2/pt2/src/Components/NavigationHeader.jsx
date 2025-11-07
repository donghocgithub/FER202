// NavigationHeader.jsx là component thanh điều hướng chung chứa thông tin đăng nhập và nút Logout
import React from 'react';
import { Navbar, Nav, Button, Container } from 'react-bootstrap';
import { useAuth } from '../Contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
const NavigationHeader = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const fullName = user?.fullName || user?.username || 'Student';

    const handleLogout = () => {
        logout();
        navigate('/login');
    };
    return (
        <Navbar bg="primary" variant="dark" expand="lg" className="mb-4">
            <Container>
                <Navbar.Brand as={Link} to="/home">TuitionTracker</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/home">Dashboard</Nav.Link>
                        {user ? (
                            // If user is logged in, always show the link so they can attempt access;
                            // PrivateRoute will enforce admin permission and redirect with message if unauthorized.
                            <Nav.Link as={Link} to="/users">User Management</Nav.Link>
                        ) : (
                            // Not logged in: show disabled label to indicate the feature exists
                            <Nav.Link disabled style={{ opacity: 0.6, cursor: 'not-allowed' }}>
                                User Management
                            </Nav.Link>
                        )}
                    </Nav>
                    <Nav>
                        <Navbar.Text className="me-3">
                            Signed in as: <strong>{fullName}</strong>
                        </Navbar.Text>
                        <Button variant="outline-light" onClick={handleLogout}>
                            Logout
                        </Button>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};
export default NavigationHeader;

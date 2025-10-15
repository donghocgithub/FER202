import { useState } from 'react';
import { Form, Button, Card, Container, Row, Col, Modal } from 'react-bootstrap';  

function LoginForm({ onSubmit }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  // State để hiển thị modal
  const [showModal, setShowModal] = useState(false);

// Xử lý thay đổi input username
const handleUsernameChange = (e) => {
    const value = e.target.value;
    setUsername(value);
    
    // Validation cho username
    let error = '';
    if (value.length > 0) {
      if (value.trim().length < 3) {
        error = 'Username must be at least 3 characters';
      } else if (!/^[a-zA-Z0-9._]+$/.test(value)) {
        error = 'Username can only contain letters, numbers, . or _';
      } else if (value !== value.trim()) {
        error = 'Username cannot have spaces at the beginning or end';
      }
    }
    
    setErrors((prev) => ({ ...prev, username: error }));
  }
  
  // Xử lý thay đổi input password
  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    
    // Validation cho password
    let error = '';
    if (value.length > 0) {
      if (value.length < 6) {
        error = 'Password must be at least 6 characters';
      } else if (!/[A-Z]/.test(value)) {
        error = 'Password must contain at least one uppercase letter';
      } else if (!/[a-z]/.test(value)) {
        error = 'Password must contain at least one lowercase letter';
      } else if (!/[0-9]/.test(value)) {
        error = 'Password must contain at least one number';
      }
    }
    
    setErrors((prev) => ({ ...prev, password: error }));
  }
  
  // Xử lý submit form
  const handleSubmit = (e) => {
    e.preventDefault(); // Ngăn chặn reload trang
    const newErrors = {};       
    
    // Validate username
    if (username.trim() === '') {
      newErrors.username = 'Username is required';
    } else if (username.trim().length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    } else if (!/^[a-zA-Z0-9._]+$/.test(username)) {
      newErrors.username = 'Username can only contain letters, numbers, . or _';
    } else if (username !== username.trim()) {
      newErrors.username = 'Username cannot have spaces at the beginning or end';
    }
    
    // Validate password
    if (password.trim() === '') {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    } else if (!/[A-Z]/.test(password)) {
      newErrors.password = 'Password must contain at least one uppercase letter';
    } else if (!/[a-z]/.test(password)) {
      newErrors.password = 'Password must contain at least one lowercase letter';
    } else if (!/[0-9]/.test(password)) {
      newErrors.password = 'Password must contain at least one number';
    }
    
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      // onSubmit({ username, password });
      setShowModal(true); // Hiển thị modal khi không có lỗi
    }
  }
  
  // Đóng modal và reset form
  const handleCloseModal = () => {
    setShowModal(false);
    setUsername('');
    setPassword('');
    setErrors({});
  }

    return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col md={6}>
            <Card>
                <Card.Header>
                    <h3 className="text-center">Login</h3>
                </Card.Header>
                <Card.Body>
                    <Form onSubmit={handleSubmit}>  
                        <Form.Group controlId="username" className="mb-3">
                            <Form.Label>Username</Form.Label>
                            <Form.Control 
                                type="text"
                                value={username}
                                onChange={handleUsernameChange} 
                                isInvalid={!!errors.username}
                                placeholder="Enter username"
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.username}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="password" className="mb-3">  
                            <Form.Label>Password</Form.Label>
                            <Form.Control 
                                type="password"
                                value={password}
                                onChange={handlePasswordChange} 
                                isInvalid={!!errors.password}   
                                placeholder="Enter password"
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.password}
                            </Form.Control.Feedback>
                        </Form.Group>   
                        <Button variant="primary" type="submit" className="w-100">
                            Login
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </Col>
        </Row>
         {/* Modal hiển thị khi đăng nhập thành công */}
        <Modal show={showModal} onHide={handleCloseModal} centered>
          <Modal.Header closeButton>
            <Modal.Title>Login Successful</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Welcome, {username}!</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
    </Container>
    );
}

export default LoginForm;

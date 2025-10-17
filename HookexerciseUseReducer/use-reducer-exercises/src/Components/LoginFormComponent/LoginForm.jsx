import React, { useReducer } from 'react';
import { Form, Button, Card, Container, Row, Col, Modal } from 'react-bootstrap';

// Initial state
const initialState = {
  username: '',
  password: '',
  errors: {},
  showModal: false
};

// Reducer function đơn giản
function formReducer(state, action) {
  switch (action.type) {
    case 'SET_USERNAME':
      return { ...state, username: action.value };
      
    case 'SET_PASSWORD':
      return { ...state, password: action.value };
      
    case 'SET_ERRORS':
      return { ...state, errors: action.value };
      
    case 'SET_SHOW_MODAL':
      return { ...state, showModal: action.value };
      
    case 'RESET_FORM':
      return initialState;
      
    case 'VALIDATE_FIELD':
      return {
        ...state,
        errors: { ...state.errors, [action.field]: action.error }
      };
      
    default:
      return state;
  }
}

function LoginForm({ onSubmit }) {
  const [state, dispatch] = useReducer(formReducer, initialState);
  const { username, password, errors, showModal } = state;

  // Validation functions
  const validateUsername = (value) => {
    if (value.trim() === '') return 'Username is required';
    if (value.trim().length < 3) return 'Username must be at least 3 characters';
    if (!/^[a-zA-Z0-9._]+$/.test(value)) return 'Username can only contain letters, numbers, . or _';
    if (value !== value.trim()) return 'Username cannot have spaces at the beginning or end';
    return '';
  };

  const validatePassword = (value) => {
    if (value.trim() === '') return 'Password is required';
    if (value.length < 6) return 'Password must be at least 6 characters';
    if (!/[A-Z]/.test(value)) return 'Password must contain at least one uppercase letter';
    if (!/[a-z]/.test(value)) return 'Password must contain at least one lowercase letter';
    if (!/[0-9]/.test(value)) return 'Password must contain at least one number';
    return '';
  };

  // Event handlers đơn giản
  const handleUsernameChange = (e) => {
    const value = e.target.value;
    dispatch({ type: 'SET_USERNAME', value });
    
    const error = validateUsername(value);
    dispatch({ type: 'VALIDATE_FIELD', field: 'username', error });
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    dispatch({ type: 'SET_PASSWORD', value });
    
    const error = validatePassword(value);
    dispatch({ type: 'VALIDATE_FIELD', field: 'password', error });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const usernameError = validateUsername(username);
    const passwordError = validatePassword(password);
    
    const newErrors = {
      username: usernameError,
      password: passwordError
    };
    
    dispatch({ type: 'SET_ERRORS', value: newErrors });
    
    const hasErrors = Object.values(newErrors).some(error => error !== '');
    
    if (!hasErrors) {
      dispatch({ type: 'SET_SHOW_MODAL', value: true });
    }
  };

  const handleCloseModal = () => {
    dispatch({ type: 'RESET_FORM' });
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col md={6}>
          <Card>
            <Card.Header>
              <h3 className="text-center">Login Form</h3>
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
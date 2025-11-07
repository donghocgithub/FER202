import React, { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuthDispatch, useAuthState } from '../contexts/AuthContext';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [validationErrors, setValidationErrors] = useState({
    username: '',
    password: ''
  });
  const navigate = useNavigate();
  const { login } = useAuthDispatch();
  const { error, loading } = useAuthState();

  const validateUsername = (value) => {
    if (!value) {
      return 'Username is required';
    }
    if (value.length < 3) {
      return 'Username must be at least 3 characters';
    }
    return '';
  };

  const validatePassword = (value) => {
    if (!value) {
      return 'Password is required';
    }
    if (value.length < 6) {
      return 'Password must be at least 6 characters';
    }
    return '';
  };

  const handleUsernameChange = (e) => {
    const value = e.target.value;
    setUsername(value);
    setValidationErrors(prev => ({
      ...prev,
      username: validateUsername(value)
    }));
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    setValidationErrors(prev => ({
      ...prev,
      password: validatePassword(value)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const usernameError = validateUsername(username);
    const passwordError = validatePassword(password);
    
    setValidationErrors({
      username: usernameError,
      password: passwordError
    });

    if (!usernameError && !passwordError) {
      const success = await login(username, password);
      if (success) {
        navigate('/movies');
      }
    }
  };

  return (
    <Container className="mt-5">
      <div className="mx-auto" style={{ maxWidth: '400px' }}>
        <h2 className="text-center mb-4">🎬 Movie Manager Login</h2>
        <Form onSubmit={handleSubmit}>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form.Group className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              value={username}
              onChange={handleUsernameChange}
              placeholder="Enter username"
              isInvalid={!!validationErrors.username}
              required
            />
            <Form.Control.Feedback type="invalid">
              {validationErrors.username}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={handlePasswordChange}
              placeholder="Enter password"
              isInvalid={!!validationErrors.password}
              required
            />
            <Form.Control.Feedback type="invalid">
              {validationErrors.password}
            </Form.Control.Feedback>
          </Form.Group>

          <Button
            variant="primary"
            type="submit"
            className="w-100"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </Button>
        </Form>
      </div>
    </Container>
  );
};

export default LoginPage;
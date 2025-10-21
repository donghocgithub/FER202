import React, { useReducer } from 'react';
import { Form, Button, Card, Container, Row, Col, Modal, InputGroup } from 'react-bootstrap';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

// Initial state
const initialState = {
    email: '',
    password: '',
    confirmPassword: '',
    errors: {},
    showModal: false,
    showPassword: false,
    showConfirmPassword: false
};

// Reducer function đơn giản
function formReducer(state, action) {
    switch (action.type) {
        case 'SET_EMAIL':
            return { ...state, email: action.value };
        case 'SET_PASSWORD':
            return { ...state, password: action.value };
        case 'SET_CONFIRM_PASSWORD':
            return { ...state, confirmPassword: action.value };
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
        case 'TOGGLE_PASSWORD_VISIBILITY':
            return {
                ...state,
                showPassword: !state.showPassword
            };
        case 'TOGGLE_CONFIRM_PASSWORD_VISIBILITY':
            return {
                ...state,
                showConfirmPassword: !state.showConfirmPassword
            };
        default:
            return state;
    }
}

function SignUpForm({ onSubmit = () => {} }) {
    const [state, dispatch] = useReducer(formReducer, initialState);
    const { email, password, confirmPassword, errors, showModal, showPassword, showConfirmPassword } = state;

    // Validation functions
    const validateEmail = (value) => {
        if (value.trim() === '') return 'Email is required';
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) return 'Invalid email format';
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
    
    const validateConfirmPassword = (value) => {
        if (value.trim() === '') return 'Please confirm your password';
        if (value !== password) return 'Passwords do not match';
        return '';
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        const emailError = validateEmail(email);
        const passwordError = validatePassword(password);
        const confirmPasswordError = validateConfirmPassword(confirmPassword);
        const newErrors = {
            email: emailError,
            password: passwordError,
            confirmPassword: confirmPasswordError
        };
        dispatch({ type: 'SET_ERRORS', value: newErrors });
        const hasErrors = Object.values(newErrors).some(error => error !== '');
        if (!hasErrors) {
            dispatch({ type: 'SET_SHOW_MODAL', value: true });
            onSubmit({ email, password, confirmPassword });
        }
    };
    
    const handleCloseModal = () => {
        dispatch({ type: 'RESET_FORM' });
    };
    
    const handleEmailChange = (e) => {
        const value = e.target.value;
        dispatch({ type: 'SET_EMAIL', value });
        const error = validateEmail(value);
        dispatch({ type: 'VALIDATE_FIELD', field: 'email', error });
    };
    
    const handlePasswordChange = (e) => {
        const value = e.target.value;
        dispatch({ type: 'SET_PASSWORD', value });
        const error = validatePassword(value);
        dispatch({ type: 'VALIDATE_FIELD', field: 'password', error });
        
        // Re-validate confirm password if it has a value
        if (confirmPassword) {
            const confirmError = validateConfirmPassword(confirmPassword);
            dispatch({ type: 'VALIDATE_FIELD', field: 'confirmPassword', error: confirmError });
        }
    };
    
    const handleConfirmPasswordChange = (e) => {
        const value = e.target.value;
        dispatch({ type: 'SET_CONFIRM_PASSWORD', value });
        const error = validateConfirmPassword(value);
        dispatch({ type: 'VALIDATE_FIELD', field: 'confirmPassword', error });
    };
    
    const togglePasswordVisibility = () => {
        dispatch({ type: 'TOGGLE_PASSWORD_VISIBILITY' });
    };
    
    const toggleConfirmPasswordVisibility = () => {
        dispatch({ type: 'TOGGLE_CONFIRM_PASSWORD_VISIBILITY' });
    };

    return (
        <Container className="mt-5">
            <Row className="justify-content-md-center">
                <Col md={6}>
                    <Card>
                        <Card.Header>   
                            <h3 className="text-center">Sign Up Form</h3>
                        </Card.Header>
                        <Card.Body>
                            <Form onSubmit={handleSubmit} noValidate>
                                <Form.Group controlId="formEmail" className="mb-3">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control
                                        type="email"
                                        value={email}
                                        onChange={handleEmailChange}
                                        isInvalid={!!errors.email}
                                        placeholder="Enter email"
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.email}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group controlId="formPassword" className="mb-3">
                                    <Form.Label>Password</Form.Label>
                                    <InputGroup>
                                        <Form.Control
                                            type={showPassword ? "text" : "password"} 
                                            value={password}
                                            onChange={handlePasswordChange}
                                            isInvalid={!!errors.password}   
                                            placeholder="Enter password"
                                        />
                                        <Button 
                                            variant="outline-secondary" 
                                            onClick={togglePasswordVisibility}
                                            type="button"
                                        >
                                            {showPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
                                        </Button>
                                        <Form.Control.Feedback type="invalid">
                                            {errors.password}
                                        </Form.Control.Feedback>
                                    </InputGroup>
                                </Form.Group>
                                <Form.Group controlId="formConfirmPassword" className="mb-3">
                                    <Form.Label>Confirm Password</Form.Label>
                                    <InputGroup>
                                        <Form.Control
                                            type={showConfirmPassword ? "text" : "password"}
                                            value={confirmPassword}
                                            onChange={handleConfirmPasswordChange}
                                            isInvalid={!!errors.confirmPassword}    
                                            placeholder="Confirm password"
                                        />
                                        <Button 
                                            variant="outline-secondary" 
                                            onClick={toggleConfirmPasswordVisibility}
                                            type="button"
                                        >
                                            {showConfirmPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
                                        </Button>
                                        <Form.Control.Feedback type="invalid">
                                            {errors.confirmPassword}
                                        </Form.Control.Feedback>
                                    </InputGroup>
                                </Form.Group>
                                <Button variant="primary" type="submit" className="w-100">
                                    Sign Up
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>  
            </Row>  
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Sign Up Successful</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Welcome, {email}!</p>    
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

export default SignUpForm;

import React, { useReducer } from 'react';
import { Form, Button, Card, Container, Row, Col, InputGroup } from 'react-bootstrap';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import Toast from '../Toast/Toast';
import SuccessModal from '../SuccessModalComponent/SuccessModal';

// Initial state
const initialState = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    errors: {},
    showModal: false,
    showPassword: false,
    showConfirmPassword: false,
    toast: { show: false, message: '', type: '' }
};

// Reducer function đơn giản
function formReducer(state, action) {
    switch (action.type) {
        case 'SET_USERNAME':
            return { ...state, username: action.value };
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
        case 'SET_TOAST':
            return {
                ...state,
                toast: action.value
            };
        case 'HIDE_TOAST':
            return {
                ...state,
                toast: { show: false, message: '', type: '' }
            };
        default:
            return state;
    }
}

function SignUpForm({ onSubmit = () => {} }) {
    const [state, dispatch] = useReducer(formReducer, initialState);
    const { username, email, password, confirmPassword, errors, showModal, showPassword, showConfirmPassword, toast } = state;

    // Validation functions
    const validateUsername = (value) => {
        if (value.trim() === '') return 'Username is required';
        if (value.trim().length < 3) return 'Username must be at least 3 characters';
        if (!/^[a-zA-Z0-9._]+$/.test(value)) return 'Username can only contain letters, numbers, . or _';
        if (value !== value.trim()) return 'Username cannot have spaces at the beginning or end';
        return '';
    };
    
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
        const usernameError = validateUsername(username);
        const emailError = validateEmail(email);
        const passwordError = validatePassword(password);
        const confirmPasswordError = validateConfirmPassword(confirmPassword);
        const newErrors = {
            username: usernameError,
            email: emailError,
            password: passwordError,
            confirmPassword: confirmPasswordError
        };
        dispatch({ type: 'SET_ERRORS', value: newErrors });
        const hasErrors = Object.values(newErrors).some(error => error !== '');
        if (!hasErrors) {
            dispatch({ type: 'SET_SHOW_MODAL', value: true });
            dispatch({ type: 'SET_TOAST', value: { show: true, message: 'Registration successful!', type: 'success' } });
            onSubmit({ username, email, password, confirmPassword });
        } else {
            dispatch({ type: 'SET_TOAST', value: { show: true, message: 'Please fix the errors and try again!', type: 'error' } });
        }
    };
    
    const handleCloseModal = () => {
        dispatch({ type: 'RESET_FORM' });
    };
    
    const handleUsernameChange = (e) => {
        const value = e.target.value;
        dispatch({ type: 'SET_USERNAME', value });
        const error = validateUsername(value);
        dispatch({ type: 'VALIDATE_FIELD', field: 'username', error });
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
    
    const handleCloseToast = () => {
        dispatch({ type: 'HIDE_TOAST' });
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
                                <Form.Group controlId="formUsername" className="mb-3">
                                    <Form.Label style={{textAlign: 'left', display: 'block'}}>Username</Form.Label>
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
                                <Form.Group controlId="formEmail" className="mb-3">
                                    <Form.Label style={{textAlign: 'left', display: 'block'}}>Email address</Form.Label>
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
                                    <Form.Label style={{textAlign: 'left', display: 'block'}}>Password</Form.Label>
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
                                    <Form.Label style={{textAlign: 'left', display: 'block'}}>Confirm Password</Form.Label>
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
                                <div style={{ display: 'flex', justifyContent: 'space-between',gap: '10px' }}>
                                <Button variant="primary" type="submit" className="w-100">
                                    Sign Up
                                </Button>
                                <Button variant="secondary" type="button" className="w-100" onClick={() => dispatch({ type: 'RESET_FORM' })}>
                                    Cancel
                                </Button>
                                </div>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>  
            </Row>  
            
            {/* Success Modal omponent */}
            <SuccessModal
                show={showModal} 
                onHide={handleCloseModal}
                userData={{ email }}
            />
            
            {/* Toast Notification Component*/}
            <Toast 
                message={toast.message}
                type={toast.type}
                isVisible={toast.show}
                onClose={handleCloseToast}
            />
        </Container>
    );
}

export default SignUpForm;

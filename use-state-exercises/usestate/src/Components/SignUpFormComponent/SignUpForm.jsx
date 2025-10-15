import React, { useState } from 'react';
import { Form, Button, Card, Container, Row, Col, Modal } from 'react-bootstrap';
import Toast from '../Toast/Toast';

function SignUpForm({ onSubmit }) {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [errors, setErrors] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [toast, setToast] = useState({ show: false, message: '', type: '' });

    // Xử lý thay đổi input
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        
        // Kiểm tra lỗi cho từng trường
        let error = '';
        if (value.length > 0) {
            if (name === 'username') {
                if (value.trim().length < 3) {
                    error = 'Username must be at least 3 characters';
                } else if (!/^[a-zA-Z0-9._]+$/.test(value)) {
                    error = 'Username can only contain letters, numbers, . or _';
                } else if (value !== value.trim()) {
                    error = 'Username cannot have spaces at the beginning or end';
                }
            } else if (name === 'email') {
                if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                    error = 'Invalid email format';
                }
            } else if (name === 'password') {
                if (value.length < 8) {
                    error = 'Password must be at least 8 characters';
                } else if (!/[A-Z]/.test(value)) {
                    error = 'Password must contain at least one uppercase letter';
                } else if (!/[a-z]/.test(value)) {
                    error = 'Password must contain at least one lowercase letter';
                } else if (!/[0-9]/.test(value)) {
                    error = 'Password must contain at least one number';
                } else if (!/[!@#$%^&*]/.test(value)) {
                    error = 'Password must contain at least one special character';
                }
                // Kiểm tra lại confirm password khi password thay đổi
                if (formData.confirmPassword && value !== formData.confirmPassword) {
                    setErrors((prev) => ({ ...prev, confirmPassword: 'Passwords do not match' }));
                }
            } else if (name === 'confirmPassword') {
                if (value !== formData.password) {
                    error = 'Passwords do not match';
                }
            }
        }
        setErrors((prev) => ({ ...prev, [name]: error }));
    };

    // Xử lý submit form
    const handleSubmit = (e) => {
        e.preventDefault(); // Ngăn chặn reload trang
        
        const newErrors = {};
        
        // Validate username
        if (formData.username.trim().length < 3 || !/^[a-zA-Z0-9._]+$/.test(formData.username)) {
            newErrors.username = 'Username must be at least 3 characters and can only contain letters, numbers, . or _';    
        }
        
        // Validate email
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Invalid email format';
        }
        
        // Validate password
        if (formData.password.length < 8 || !/[A-Z]/.test(formData.password) || !/[a-z]/.test(formData.password) || !/[0-9]/.test(formData.password) || !/[!@#$%^&*]/.test(formData.password)) {
            newErrors.password = 'Password must be at least 8 characters and include uppercase, lowercase, number, and special character';
        }
        
        // Validate confirm password
        if (formData.confirmPassword !== formData.password) {
            newErrors.confirmPassword = 'Passwords do not match';
        }
        
        setErrors(newErrors);
        
        if (Object.keys(newErrors).length === 0) {
            setShowModal(true); // Hiển thị modal khi không có lỗi
            setToast({ show: true, message: 'Submitted successfully!', type: 'success' });
        } else {
            setToast({ show: true, message: 'Failed to submit!', type: 'error' });
        }
    };

    // Đóng modal và reset form
    const handleCloseModal = () => {    
        setShowModal(false);
        setFormData({
            username: '',
            email: '',
            password: '',
            confirmPassword: ''
        });
        setErrors({});
    };

    // Reset form và errors
    const handleCancel = () => {
        setFormData({
            username: '',
            email: '',
            password: '',
            confirmPassword: ''
        });
        setErrors({});
    };

    // Đóng toast
    const handleCloseToast = () => {
        setToast({ show: false, message: '', type: '' });
    };

    // Kiểm tra form có lỗi hay không
    const isFormValid = Object.values(errors).every(error => error === '') &&
        formData.username && formData.email && formData.password && formData.confirmPassword;

    return (
        <Container className="mt-5">
            <Row className="justify-content-md-center"> 
                <Col md={6}>
                    <Card>
                        <Card.Header>
                            <h3 className="text-center">Sign Up Form</h3>
                        </Card.Header>
                        <Card.Body> 
                            <Form onSubmit={handleSubmit}>
                                <Form.Group controlId="username" className="mb-3">
                                    <Form.Label>Username</Form.Label>   
                                    <Form.Control   
                                        type="text"
                                        name="username"
                                        value={formData.username}
                                        onChange={handleChange}
                                        isInvalid={!!errors.username}
                                        placeholder="Enter username"    
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.username}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group controlId="email" className="mb-3">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        name="email"
                                        value={formData.email}  
                                        onChange={handleChange}
                                        isInvalid={!!errors.email}
                                        placeholder="Enter email"       
                                    />  
                                    <Form.Control.Feedback type="invalid">
                                        {errors.email}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group controlId="password" className="mb-3">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        isInvalid={!!errors.password}
                                        placeholder="Enter password"
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.password}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group controlId="confirmPassword" className="mb-3">
                                    <Form.Label>Confirm Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        name="confirmPassword"  
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        isInvalid={!!errors.confirmPassword}    
                                        placeholder="Confirm password"
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.confirmPassword}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <div className="d-grid gap-2">
                                    <Button variant="primary" type="submit" disabled={!isFormValid}>
                                        Submit
                                    </Button>
                                    <Button variant="secondary" type="button" onClick={handleCancel}>
                                        Cancel
                                    </Button>
                                </div>
                            </Form>
                        </Card.Body>    
                    </Card>
                </Col>
            </Row>  

            {/* Modal hiển thị khi đăng ký thành công */}   
            <Modal show={showModal} onHide={handleCloseModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Registration Successful</Modal.Title>
                </Modal.Header> 
                <Modal.Body>
                    <Card>
                        <Card.Body>
                            <h5 className="text-center text-success">Submitted successfully!</h5>
                            <p><strong>Username:</strong> {formData.username}</p>   
                            <p><strong>Email:</strong> {formData.email}</p>
                        </Card.Body>
                    </Card>
                </Modal.Body>
                <Modal.Footer>  
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
            
            {/* Toast Notification */}
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

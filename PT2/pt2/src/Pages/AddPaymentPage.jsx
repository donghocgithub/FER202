import React, { useState } from 'react';
import { Toast, ToastContainer } from 'react-bootstrap';
import { Container, Card, Form, Button, Row, Col } from 'react-bootstrap';
import { usePayment } from '../Contexts/PaymentContext';
import { useNavigate } from 'react-router-dom';
import NavigationHeader from '../Components/NavigationHeader';

const AddPaymentPage = () => {
    const { createPayment } = usePayment();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        semester: '',
        courseName: '',
        amount: '',
        date: new Date().toISOString().split('T')[0],
    });

    const [errors, setErrors] = useState({});
    const [isValid, setIsValid] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [toastMsg, setToastMsg] = useState({ variant: 'success', text: '' });

    const validate = (data) => {
        const e = {};
        if (!data.semester || String(data.semester).trim() === '') {
            e.semester = 'Semester is required';
        }
        if (!data.courseName || String(data.courseName).trim() === '') {
            e.courseName = 'Course name is required';
        }
        const amt = parseFloat(data.amount);
        if (Number.isNaN(amt) || amt <= 0) {
            e.amount = 'Amount must be a positive number';
        }
        // validate date
        const d = new Date(data.date);
        if (!data.date || isNaN(d.getTime())) {
            e.date = 'Please select a valid date';
        }
        return e;
    };

    // validate on every change
    React.useEffect(() => {
        const e = validate(formData);
        setErrors(e);
        setIsValid(Object.keys(e).length === 0);
    }, [formData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const eObj = validate(formData);
        setErrors(eObj);
        if (Object.keys(eObj).length > 0) return; // abort submit

        const paymentData = {
            semester: formData.semester,
            courseName: formData.courseName,
            amount: parseFloat(formData.amount),
            date: formData.date,
        };
        try {
            await createPayment(paymentData);
            // show success toast then navigate
            setToastMsg({ variant: 'success', text: 'Payment created successfully' });
            setShowToast(true);
            setTimeout(() => navigate('/home'), 800);
        } catch (err) {
            setToastMsg({ variant: 'danger', text: err.message || 'Failed to create payment' });
            setShowToast(true);
        }
    };

    return (
        <>
            <NavigationHeader />
            <Container className="my-4 content-container">
                <Row className="justify-content-center">
                    <Col md={8}>
                        <Card>
                            <Card.Header as="h4">Thêm Thanh Toán</Card.Header>
                            <Card.Body>
                                <ToastContainer position="top-end" className="p-3" style={{ position: 'fixed', top: 16, right: 16, zIndex: 1050 }}>
                                    <Toast bg={toastMsg.variant} onClose={() => setShowToast(false)} show={showToast} delay={6000} autohide>
                                        <Toast.Body className={toastMsg.variant === 'success' ? 'text-white' : ''}>{toastMsg.text}</Toast.Body>
                                    </Toast>
                                </ToastContainer>
                                <Form onSubmit={handleSubmit}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Semester</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="semester"
                                            value={formData.semester}
                                            onChange={handleChange}
                                            isInvalid={!!errors.semester}
                                        />
                                        <Form.Control.Feedback type="invalid">{errors.semester}</Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label>Course Name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="courseName"
                                            value={formData.courseName}
                                            onChange={handleChange}
                                            isInvalid={!!errors.courseName}
                                        />
                                        <Form.Control.Feedback type="invalid">{errors.courseName}</Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label>Amount</Form.Label>
                                        <Form.Control
                                            type="number"
                                            name="amount"
                                            value={formData.amount}
                                            onChange={handleChange}
                                            isInvalid={!!errors.amount}
                                        />
                                        <Form.Control.Feedback type="invalid">{errors.amount}</Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label>Date</Form.Label>
                                        <Form.Control
                                            type="date"
                                            name="date"
                                            value={formData.date}
                                            onChange={handleChange}
                                            isInvalid={!!errors.date}
                                        />
                                        <Form.Control.Feedback type="invalid">{errors.date}</Form.Control.Feedback>
                                    </Form.Group>

                                    <div className="d-flex justify-content-end gap-2">
                                        <Button variant="secondary" onClick={() => navigate('/home')}>
                                            Hủy
                                        </Button>
                                        <Button variant="primary" type="submit" disabled={!isValid}>
                                            Thêm
                                        </Button>
                                    </div>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default AddPaymentPage;


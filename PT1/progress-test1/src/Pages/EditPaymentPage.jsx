import React, { useState, useEffect } from 'react';
import { Toast, ToastContainer } from 'react-bootstrap';
import { Container, Card, Form, Button, Row, Col } from 'react-bootstrap';
import { usePayment } from '../Contexts/PaymentContext';
import { useParams, useNavigate } from 'react-router-dom';
import NavigationHeader from '../Components/NavigationHeader';

const EditPaymentPage = () => {
    const { paymentId } = useParams();
    const navigate = useNavigate();
    const { currentPayment, fetchPaymentById, updatePayment } = usePayment();
    const [formData, setFormData] = useState({
        semester: '',
        courseName: '',
        amount: '',
        date: '',
    });
    const [showToast, setShowToast] = useState(false);
    const [toastMsg, setToastMsg] = useState({ variant: 'success', text: '' });

    useEffect(() => {
        if (paymentId) {
            fetchPaymentById(paymentId);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [paymentId]);

    useEffect(() => {
        if (currentPayment) {
            setFormData({
                semester: currentPayment.semester || '',
                courseName: currentPayment.courseName || '',
                amount: currentPayment.amount || '',
                date: currentPayment.date ? currentPayment.date.split('T')[0] : '',
            });
        }
    }, [currentPayment]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        // If user changes the date, auto-compute semester from the selected date
        if (name === 'date') {
            const computedSemester = computeSemesterFromDate(value);
            setFormData(prev => ({
                ...prev,
                date: value,
                semester: computedSemester || prev.semester,
            }));
            return;
        }

        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Derive a semester string (e.g. "Fall 2025") from an ISO date (YYYY-MM-DD)
    const computeSemesterFromDate = (isoDate) => {
        if (!isoDate) return '';
        // isoDate expected as YYYY-MM-DD
        const parts = isoDate.split('-');
        if (parts.length < 3) return '';
        const year = parseInt(parts[0], 10);
        const month = parseInt(parts[1], 10);

        // Simple mapping:
        // Jan - Apr  => Spring
        // May - Jul  => Summer
        // Aug - Dec  => Fall
        let season = '';
        if (month >= 1 && month <= 4) season = 'Spring';
        else if (month >= 5 && month <= 7) season = 'Summer';
        else if (month >= 8 && month <= 12) season = 'Fall';

        return season ? `${season} ${year}` : '';
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const paymentData = {
            semester: formData.semester,
            courseName: formData.courseName,
            amount: parseFloat(formData.amount),
            date: formData.date,
            ...(currentPayment?.userId && { userId: currentPayment.userId }),
        };
        try {
            await updatePayment(paymentId, paymentData);
            setToastMsg({ variant: 'success', text: 'Payment updated successfully' });
            setShowToast(true);
            setTimeout(() => navigate(`/payments/${paymentId}`), 800);
        } catch (err) {
            setToastMsg({ variant: 'danger', text: err.message || 'Failed to update payment' });
            setShowToast(true);
        }
    };

    if (!currentPayment) {
        return (
            <>
                <NavigationHeader />
                <Container className="my-4">
                    <Button variant="primary" onClick={() => navigate('/home')}>
                        Quay lại
                    </Button>
                </Container>
            </>
        );
    }

    return (
        <>
            <NavigationHeader />
            <Container className="my-4 content-container">
                <Row className="justify-content-center">
                    <Col md={8}>
                        <Card>
                            <Card.Header as="h4">Chỉnh Sửa Thanh Toán</Card.Header>
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
                                        />
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label>Course Name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="courseName"
                                            value={formData.courseName}
                                            onChange={handleChange}
                                        />
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label>Amount</Form.Label>
                                        <Form.Control
                                            type="number"
                                            name="amount"
                                            value={formData.amount}
                                            onChange={handleChange}
                                        />
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label>Date</Form.Label>
                                        <Form.Control
                                            type="date"
                                            name="date"
                                            value={formData.date}
                                            onChange={handleChange}
                                        />
                                    </Form.Group>

                                    <div className="d-flex justify-content-end gap-2">
                                        <Button variant="secondary" onClick={() => navigate(`/payments/${paymentId}`)}>
                                            Hủy
                                        </Button>
                                        <Button variant="primary" type="submit">
                                            Cập nhật
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

export default EditPaymentPage;


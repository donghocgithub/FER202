import React, { useEffect } from 'react';
import { Container, Card, Button, Row, Col, ListGroup } from 'react-bootstrap';
import { usePayment } from '../Contexts/PaymentContext';
import { useParams, useNavigate } from 'react-router-dom';
import NavigationHeader from '../Components/NavigationHeader';

const ViewDetailsPage = () => {
    const { paymentId } = useParams();
    const navigate = useNavigate();
    const { currentPayment, fetchPaymentById } = usePayment();

    useEffect(() => {
        if (paymentId) {
            fetchPaymentById(paymentId);
        }
    }, [paymentId]);

    const formatAmount = (amount) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(amount);
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
                            <Card.Header as="h4">Chi Tiết Thanh Toán</Card.Header>
                            <Card.Body>
                                <ListGroup variant="flush">
                                    <ListGroup.Item>
                                        <strong className="detail-label">ID:</strong> {currentPayment.id}
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <strong className="detail-label">Semester:</strong> {currentPayment.semester}
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <strong className="detail-label">Course Name:</strong> {currentPayment.courseName}
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <strong className="detail-label">Amount:</strong> {formatAmount(currentPayment.amount)}
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <strong className="detail-label">Date:</strong> {currentPayment.date}
                                    </ListGroup.Item>
                                </ListGroup>

                                <div className="d-flex justify-content-end gap-2 mt-4">
                                    <Button variant="secondary" onClick={() => navigate('/home')}>
                                        Quay lại
                                    </Button>
                                    <Button variant="primary" onClick={() => navigate(`/payments/${paymentId}/edit`)}>
                                        Chỉnh sửa
                                    </Button>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default ViewDetailsPage;


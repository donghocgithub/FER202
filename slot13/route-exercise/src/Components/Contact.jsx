import React from 'react';
import { Container, Card } from 'react-bootstrap';

const Contact = () => {
  return (
    <Container className="mt-5">
      <Card>
        <Card.Header>
          <h2 className="text-center">Liên Hệ</h2>
        </Card.Header>
        <Card.Body>
          <div className="text-center">
            <h4>Thông Tin Liên Hệ</h4>
            <p><strong>Email:</strong> contact@example.com</p>
            <p><strong>Điện thoại:</strong> 0123 456 789</p>
            <p><strong>Địa chỉ:</strong> 123 Đường ABC, Quận XYZ, TP.HCM</p>
            
            <hr />
            
            <h5>Giờ Làm Việc</h5>
            <p>Thứ 2 - Thứ 6: 8:00 - 17:00</p>
            <p>Thứ 7: 8:00 - 12:00</p>
            <p>Chủ nhật: Nghỉ</p>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Contact;

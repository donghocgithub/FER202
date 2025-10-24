import React from 'react';
import { Container, Card } from 'react-bootstrap';

const Home = () => {
  return (
    <Container className="mt-5">
      <Card>
        <Card.Header>
          <h2 className="text-center">Trang Chủ</h2>
        </Card.Header>
        <Card.Body>
          <p className="text-center">
            Chào mừng bạn đến với trang chủ của ứng dụng React Router!
          </p>
          <div className="text-center">
            <p>Đây là bài tập về React Router DOM v6</p>
            <p>Bạn có thể điều hướng đến các trang khác bằng thanh menu phía trên.</p>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Home;

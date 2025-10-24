import React from 'react';
import { Container, Card } from 'react-bootstrap';

const Products = () => {
  return (
    <Container className="mt-5">
      <Card>
        <Card.Header>
          <h2 className="text-center">Danh Sách Sản Phẩm</h2>
        </Card.Header>
        <Card.Body>
          <p className="text-center mb-4">
            Khám phá các sản phẩm của chúng tôi
          </p>
          
          <div className="text-center">
            <p>Đây là trang sản phẩm</p>
            <p>Bạn có thể thêm danh sách sản phẩm ở đây</p>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Products;

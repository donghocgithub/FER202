import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './Form.css';

function ContactForm() {
  // Danh sách các tỉnh thành
  const provinces = [
    'Hà Nội',
    'TP. Hồ Chí Minh', 
    'Đà Nẵng',
    'Hải Phòng',
    'Cần Thơ',
    'An Giang',
    'Bà Rịa - Vũng Tàu',
    'Bắc Giang',
    'Bắc Kạn',
    'Bạc Liêu',
    'Bắc Ninh',
    'Bến Tre',
    'Bình Định',
    'Bình Dương',
    'Bình Phước',
    'Bình Thuận',
    'Cà Mau',
    'Cao Bằng',
    'Đắk Lắk',
    'Đắk Nông',
    'Điện Biên',
    'Đồng Nai',
    'Đồng Tháp',
    'Gia Lai',
    'Hà Giang',
    'Hà Nam',
    'Hà Tĩnh',
    'Hải Dương',
    'Hậu Giang',
    'Hòa Bình',
    'Hưng Yên',
    'Khánh Hòa',
    'Kiên Giang',
    'Kon Tum',
    'Lai Châu',
    'Lâm Đồng',
    'Lạng Sơn',
    'Lào Cai',
    'Long An',
    'Nam Định',
    'Nghệ An',
    'Ninh Bình',
    'Ninh Thuận',
    'Phú Thọ',
    'Phú Yên',
    'Quảng Bình',
    'Quảng Nam',
    'Quảng Ngãi',
    'Quảng Ninh',
    'Quảng Trị',
    'Sóc Trăng',
    'Sơn La',
    'Tây Ninh',
    'Thái Bình',
    'Thái Nguyên',
    'Thanh Hóa',
    'Thừa Thiên Huế',
    'Tiền Giang',
    'Trà Vinh',
    'Tuyên Quang',
    'Vĩnh Long',
    'Vĩnh Phúc',
    'Yên Bái'
  ];

  return (
    <div className="contact-form-container">
      <div className="contact-form-modal">
        <div className="form-header">
          <h2>Form Liên Hệ</h2>
          <button className="close-btn">&times;</button>
        </div>
        
        <Form>
          <Form.Group className="mb-3" controlId="fullName">
            <Form.Label>Họ và tên</Form.Label>
            <InputGroup>
              <InputGroup.Text>
                <i className="bi bi-person-fill"></i>
              </InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Nhập họ và tên"
              />
            </InputGroup>
            <Form.Text className="text-muted">
              Vui lòng nhập đầy đủ họ và tên
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email</Form.Label>
            <InputGroup>
              <InputGroup.Text>
                <i className="bi bi-envelope-fill"></i>
              </InputGroup.Text>
              <Form.Control
                type="email"
                placeholder="example@email.com"
              />
            </InputGroup>
            <Form.Text className="text-muted">
              Email để chúng tôi có thể liên hệ lại
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="phone">
            <Form.Label>Số điện thoại</Form.Label>
            <InputGroup>
              <InputGroup.Text>
                <i className="bi bi-telephone-fill"></i>
              </InputGroup.Text>
              <Form.Control
                type="tel"
                placeholder="0123456789"
              />
            </InputGroup>
            <Form.Text className="text-muted">
              Số điện thoại để liên hệ trực tiếp
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="province">
            <Form.Label>Tỉnh/Thành phố</Form.Label>
            <Form.Select>
              <option value="">Chọn tỉnh/thành phố</option>
              {provinces.map((province, index) => (
                <option key={index} value={province}>{province}</option>
              ))}
            </Form.Select>
            <Form.Text className="text-muted">
              Chọn tỉnh/thành phố nơi bạn sinh sống
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="message">
            <Form.Label>Nội dung liên hệ</Form.Label>
            <Form.Control
              as="textarea"
              placeholder="Nhập nội dung bạn muốn liên hệ..."
              rows={4}
            />
            <Form.Text className="text-muted">
              Mô tả chi tiết về vấn đề hoặc câu hỏi của bạn
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="contactType">
            <Form.Label>Loại liên hệ</Form.Label>
            <div className="contact-type-options">
              <Form.Check
                inline
                type="radio"
                label="Hỗ trợ kỹ thuật"
                name="contactType"
                value="technical"
              />
              <Form.Check
                inline
                type="radio"
                label="Tư vấn sản phẩm"
                name="contactType"
                value="consultation"
              />
              <Form.Check
                inline
                type="radio"
                label="Khiếu nại"
                name="contactType"
                value="complaint"
              />
              <Form.Check
                inline
                type="radio"
                label="Góp ý"
                name="contactType"
                value="feedback"
              />
            </div>
          </Form.Group>

          <Form.Group className="mb-3" controlId="urgent">
            <Form.Check
              type="checkbox"
              label="Đây là vấn đề khẩn cấp"
              name="urgent"
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="w-100">
            <i className="bi bi-send-fill me-2"></i>
            Gửi liên hệ
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default ContactForm;


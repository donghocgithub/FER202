import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import 'bootstrap-icons/font/bootstrap-icons.css';
import InputGroup from 'react-bootstrap/InputGroup';
import './Form.css';

function FlightBookingForm() {
  const cities = [
    'Hà nội',
    'TP.HCM', 
    'Đà Nẵng',
    'Nha Trang',
    'Cần Thơ',
    'Hải Phòng',
    'Huế',
    'Vũng Tàu'
  ];

  return (
    <div className="flight-form-container">
      <div className="flight-form-modal">
        <div className="form-header">
          <h2>Form đặt vé máy bay</h2>
          <button className="close-btn">&times;</button>
        </div>
        
        <Form>
          <Form.Group className="mb-3" controlId="fullName">
            <Form.Label>Họ tên</Form.Label>
            <InputGroup>
              <InputGroup.Text>
                <i className="bi bi-person-fill"></i>
              </InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Họ tên"
              />
              <InputGroup.Text>vnđ</InputGroup.Text>
            </InputGroup>
            <Form.Text className="text-muted">
              Phải nhập 5 ký tự, in hoa....
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="address">
            <Form.Label>Địa chỉ</Form.Label>
            <Form.Control
              as="textarea"
              placeholder="Địa chỉ"
              rows={3}
            />
            <Form.Text className="text-muted">
              Phải nhập 5 ký tự, in hoa....
            </Form.Text>
          </Form.Group>

          <div className="row mb-3">
            <div className="col-md-6">
              <Form.Group controlId="from">
                <Form.Label>Đi từ</Form.Label>
                <Form.Select>
                  {cities.map((city, index) => (
                    <option key={index} value={city}>{city}</option>
                  ))}
                </Form.Select>
              </Form.Group>
            </div>
            <div className="col-md-6">
              <Form.Group controlId="to">
                <Form.Label>Đến</Form.Label>
                <Form.Select>
                  {cities.map((city, index) => (
                    <option key={index} value={city}>{city}</option>
                  ))}
                </Form.Select>
              </Form.Group>
            </div>
          </div>

          <Form.Group className="mb-3" controlId="tripType">
            <Form.Label>Chọn chiều đi (Khứ hồi)</Form.Label>
            <div className="trip-type-options">
              <Form.Check
                inline
                type="radio"
                label="Đi"
                name="tripType"
                value="one-way"
              />
              <Form.Check
                inline
                type="radio"
                label="Về"
                name="tripType"
                value="round-trip"
              />
            </div>
          </Form.Group>

          <Button variant="primary" type="submit" className="w-100">
            Đặt vé
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default FlightBookingForm;
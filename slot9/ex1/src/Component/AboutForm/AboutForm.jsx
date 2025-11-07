import React from 'react';
import { Form, Button, InputGroup } from 'react-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './AboutForm.css';

function AboutForm({ onNext, onPrevious, isFirstStep = true }) {
  return (
    <div className="about-form-container">
      {/* About Information Section */}
      <div className="about-info-section mb-4">
        <h3 className="about-info-title">
          <i className="bi bi-person-circle me-2"></i>
          About Information
        </h3>
      </div>

      <Form>
        {/* First Name Field */}
        <Form.Group className="mb-3" controlId="formFirstName">
          <Form.Label className="required-label">
            <i className="bi bi-person-circle me-2"></i>
            First Name *
            </Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your first name"
            defaultValue=""
          />
        </Form.Group>

        {/* Last Name Field */}
        <Form.Group className="mb-3" controlId="formLastName">
          <Form.Label className="required-label">
            <i className="bi bi-person-circle me-2"></i>
            Last Name *
            </Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your last name"
            defaultValue=""
          />
        </Form.Group>

        {/* Email Field */}
        <Form.Group className="mb-3" controlId="formEmail">
          <Form.Label className="required-label">
            <i className="bi bi-envelope me-2"></i>
            Email *
          </Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter your email"
            defaultValue=""
          />
        </Form.Group>

        {/* Phone Field */}
        <Form.Group className="mb-3" controlId="formPhone">
          <Form.Label className="required-label">
            <i className="bi bi-telephone me-2"></i>
            Phone *
          </Form.Label>
          <Form.Control
            type="tel"
            placeholder="Enter your phone number"
            defaultValue=""
          />
        </Form.Group>

        {/* Age Field */}
        <Form.Group className="mb-3" controlId="formAge">
          <Form.Label className="required-label">
            <i className="bi bi-calendar me-2"></i>
            Age *
          </Form.Label>
          <InputGroup className="is-invalid">
            <Form.Control
              type="number"
              placeholder="Enter your age"
            />
            <InputGroup.Text className="bg-white border-start-0 text-danger">
              <i className="bi bi-exclamation-circle-fill"></i>
            </InputGroup.Text>
          </InputGroup>
          <Form.Text className="text-danger">Age is required</Form.Text>
        </Form.Group>

        {/* Avatar Field */}
        <Form.Group className="mb-4" controlId="formAvatar">
          <Form.Label>
            <i className="bi bi-image me-2"></i>
            Avatar
          </Form.Label>
          <Form.Control
            type="file"
            accept="image/*"
            className="file-input"
          />
          <Form.Text className="text-muted">No file chosen</Form.Text>
        </Form.Group>

        {/* Buttons */}
        <div className="d-flex justify-content-end mt-5">
          <Button 
            variant="secondary" 
            className="me-2 profile-prev-btn" 
            disabled={isFirstStep}
            onClick={onPrevious}
          >
            Previous
          </Button>
          <Button 
            variant="primary" 
            className="profile-next-btn"
            onClick={onNext}
          >
            Next
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default AboutForm;

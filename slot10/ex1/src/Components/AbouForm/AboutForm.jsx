import React from 'react';
import { Form, Button, ProgressBar, Nav, InputGroup } from 'react-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './AboutForm.css';

function AboutForm() {
  return (
    <div className="profile-form-container">
      <div className="profile-form-modal">
        {/* Header */}
        <div className="form-header-profile">
          <div className="d-flex align-items-center">
            <i className="bi bi-person-circle me-2 profile-icon"></i>
            <h2 className="mb-0">Build Your Profile</h2>
          </div>
          <button className="close-btn-profile">&times;</button>
        </div>

        {/* Progress Bar */}
        <ProgressBar now={33} className="mb-4 profile-progress-bar" />

        {/* Navigation Tabs */}
        <Nav variant="tabs" defaultActiveKey="/about" className="mb-4 profile-nav-tabs">
          <Nav.Item>
            <Nav.Link eventKey="/about" active>About</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="/account">Account</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="/address">Address</Nav.Link>
          </Nav.Item>
        </Nav>

        {/* About Information Section */}
        <div className="about-info-section mb-4">
          <h3 className="about-info-title">
            <i className="bi bi-person-fill me-2"></i>
            About Information
          </h3>
        </div>

        <Form>
          {/* First Name Field */}
          <Form.Group className="mb-3" controlId="formFirstName">
            <Form.Label className="required-label">First Name *</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your first name"
              defaultValue="traltb"
            />
          </Form.Group>

          {/* Last Name Field */}
          <Form.Group className="mb-3" controlId="formLastName">
            <Form.Label className="required-label">Last Name *</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your last name"
              defaultValue="BT"
            />
          </Form.Group>

          {/* Email Field */}
          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label className="required-label">Email *</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter your email"
              defaultValue="traltb@fe.edu.vn"
            />
          </Form.Group>

          {/* Phone Field */}
          <Form.Group className="mb-3" controlId="formPhone">
            <Form.Label className="required-label">Phone *</Form.Label>
            <Form.Control
              type="tel"
              placeholder="Enter your phone number"
              defaultValue="0976306047"
              className="focused-field"
            />
          </Form.Group>

          {/* Age Field */}
          <Form.Group className="mb-3" controlId="formAge">
            <Form.Label className="required-label">Age *</Form.Label>
            <InputGroup className="is-invalid">
              <Form.Control
                type="number"
                placeholder="Enter your age"
                className="is-invalid"
              />
              <InputGroup.Text className="bg-white border-start-0 text-danger">
                <i className="bi bi-exclamation-circle-fill"></i>
              </InputGroup.Text>
            </InputGroup>
            <Form.Text className="text-danger">Age is required</Form.Text>
          </Form.Group>

          {/* Avatar Field */}
          <Form.Group className="mb-4" controlId="formAvatar">
            <Form.Label>Avatar</Form.Label>
            <Form.Control
              type="file"
              accept="image/*"
              className="file-input"
            />
            <Form.Text className="text-muted">No file chosen</Form.Text>
          </Form.Group>

          {/* Buttons */}
          <div className="d-flex justify-content-end mt-5">
            <Button variant="secondary" className="me-2 profile-prev-btn" disabled>Previous</Button>
            <Button variant="primary" className="profile-next-btn">Next</Button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default AboutForm;

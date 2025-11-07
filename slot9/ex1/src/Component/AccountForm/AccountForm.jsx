import React from 'react';
import { Form, Button } from 'react-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './AccountForm.css';

function AccountForm({ onNext, onPrevious }) {
  return (
    <div className="account-form-container">
      {/* Account Information Section */}
      <div className="account-info-section mb-4">
        <h3 className="account-info-title">
          <i className="bi bi-lock me-2"></i>
          Account Information
        </h3>
      </div>

      <Form>
        {/* Username Field */}
        <Form.Group className="mb-3" controlId="formUsername">
          <Form.Label className="required-label">
            <i className="bi bi-person me-2"></i>
            Username *
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your username"
            defaultValue=""
          />
        </Form.Group>

        {/* Password Field */}
        <Form.Group className="mb-3" controlId="formPassword">
          <Form.Label className="required-label">
            <i className="bi bi-lock me-2"></i>
            Password *
          </Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter your password"
            defaultValue=""
          />
        </Form.Group>

        {/* Confirm Password Field */}
        <Form.Group className="mb-3" controlId="formConfirmPassword">
          <Form.Label className="required-label">
            <i className="bi bi-lock-fill me-2"></i>
            Confirm Password *
          </Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm your password"
            defaultValue=""
          />
        </Form.Group>

        {/* Secret Question Field */}
        <Form.Group className="mb-3" controlId="formSecretQuestion">
          <Form.Label className="required-label">
            <i className="bi bi-question-circle me-2"></i>
            Secret Question *
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your secret question"
            defaultValue=""
          />
        </Form.Group>

        {/* Answer Field */}
        <Form.Group className="mb-3" controlId="formAnswer">
          <Form.Label className="required-label">
            <i className="bi bi-key me-2"></i>
            Answer *
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your answer"
            defaultValue=""
          />
        </Form.Group>

        {/* Buttons */}
        <div className="d-flex justify-content-end mt-5">
          <Button 
            variant="secondary" 
            className="me-2 profile-prev-btn"
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

export default AccountForm;

import React from 'react';
import { Form, Button, ProgressBar, Nav, InputGroup } from 'react-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './AddressForm.css';

function AddressForm() {
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
        <ProgressBar now={100} className="mb-4 profile-progress-bar" />

        {/* Navigation Tabs */}
        <Nav variant="tabs" defaultActiveKey="/address" className="mb-4 profile-nav-tabs">
          <Nav.Item>
            <Nav.Link eventKey="/about">About</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="/account">Account</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="/address" active>Address</Nav.Link>
          </Nav.Item>
        </Nav>

        {/* Address Information Section */}
        <div className="address-info-section mb-4">
          <h3 className="address-info-title">
            <i className="bi bi-geo-alt-fill me-2"></i>
            Address Information
          </h3>
        </div>

        <Form>
          {/* Street Field */}
          <Form.Group className="mb-3" controlId="formStreet">
            <Form.Label className="required-label">Street *</Form.Label>
            <InputGroup className="is-invalid">
              <Form.Control
                type="text"
                placeholder="Enter your street address"
                className="is-invalid"
              />
              <InputGroup.Text className="bg-white border-start-0 text-danger">
                <i className="bi bi-exclamation-circle-fill"></i>
              </InputGroup.Text>
            </InputGroup>
            <Form.Text className="text-danger">Street is required</Form.Text>
          </Form.Group>

          {/* City Field */}
          <Form.Group className="mb-3" controlId="formCity">
            <Form.Label className="required-label">City *</Form.Label>
            <InputGroup className="is-invalid">
              <Form.Control
                type="text"
                placeholder="Enter your city"
                className="is-invalid"
              />
              <InputGroup.Text className="bg-white border-start-0 text-danger">
                <i className="bi bi-exclamation-circle-fill"></i>
              </InputGroup.Text>
            </InputGroup>
            <Form.Text className="text-danger">City is required</Form.Text>
          </Form.Group>

          {/* State Field */}
          <Form.Group className="mb-3" controlId="formState">
            <Form.Label className="required-label">State *</Form.Label>
            <InputGroup className="is-invalid">
              <Form.Control
                type="text"
                placeholder="Enter your state/province"
                className="is-invalid"
              />
              <InputGroup.Text className="bg-white border-start-0 text-danger">
                <i className="bi bi-exclamation-circle-fill"></i>
              </InputGroup.Text>
            </InputGroup>
            <Form.Text className="text-danger">State is required</Form.Text>
          </Form.Group>

          {/* Zip Code Field */}
          <Form.Group className="mb-3" controlId="formZipCode">
            <Form.Label className="required-label">Zip Code *</Form.Label>
            <InputGroup className="is-invalid">
              <Form.Control
                type="text"
                placeholder="Enter your zip/postal code"
                className="is-invalid"
              />
              <InputGroup.Text className="bg-white border-start-0 text-danger">
                <i className="bi bi-exclamation-circle-fill"></i>
              </InputGroup.Text>
            </InputGroup>
            <Form.Text className="text-danger">Zip code is required</Form.Text>
          </Form.Group>

          {/* Country Field */}
          <Form.Group className="mb-4" controlId="formCountry">
            <Form.Label className="required-label">Country *</Form.Label>
            <InputGroup className="is-invalid">
              <Form.Select className="is-invalid">
                <option>Select a country</option>
                <option>United States</option>
                <option>Canada</option>
                <option>Vietnam</option>
                <option>United Kingdom</option>
                <option>Australia</option>
                <option>Germany</option>
                <option>France</option>
                <option>Japan</option>
                <option>South Korea</option>
              </Form.Select>
              <InputGroup.Text className="bg-white border-start-0 text-danger">
                <i className="bi bi-exclamation-circle-fill"></i>
              </InputGroup.Text>
            </InputGroup>
            <Form.Text className="text-danger">Country is required</Form.Text>
          </Form.Group>

          {/* Buttons */}
          <div className="d-flex justify-content-end mt-5">
            <Button variant="secondary" className="me-2 profile-prev-btn">Previous</Button>
            <Button variant="success" className="profile-finish-btn">Finish</Button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default AddressForm;

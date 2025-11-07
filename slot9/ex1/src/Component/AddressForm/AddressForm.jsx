import React from 'react';
import { Form, Button, InputGroup } from 'react-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './AddressForm.css';

function AddressForm({ onPrevious, onFinish }) {
  return (
    <div className="address-form-container">
      {/* Address Information Section */}
      <div className="address-info-section mb-4">
        <h3 className="address-info-title">
          <i className="bi bi-geo-alt me-2"></i>
          Address Information
        </h3>
      </div>

      <Form>
        {/* Street Field */}
        <Form.Group className="mb-3" controlId="formStreet">
          <Form.Label className="required-label">
            <i className="bi bi-house me-2"></i>
            Street *
          </Form.Label>
          <InputGroup className="is-invalid">
            <Form.Control
              type="text"
              placeholder="Enter your street address"
            />
            <InputGroup.Text className="bg-white border-start-0 text-danger">
              <i className="bi bi-exclamation-circle-fill"></i>
            </InputGroup.Text>
          </InputGroup>
          <Form.Text className="text-danger">Street is required</Form.Text>
        </Form.Group>

        {/* City Field */}
        <Form.Group className="mb-3" controlId="formCity">
          <Form.Label className="required-label">
            <i className="bi bi-building me-2"></i>
            City *
          </Form.Label>
          <InputGroup className="is-invalid">
            <Form.Control
              type="text"
              placeholder="Enter your city"
            />
            <InputGroup.Text className="bg-white border-start-0 text-danger">
              <i className="bi bi-exclamation-circle-fill"></i>
            </InputGroup.Text>
          </InputGroup>
          <Form.Text className="text-danger">City is required</Form.Text>
        </Form.Group>

        {/* Country Field */}
        <Form.Group className="mb-3" controlId="formCountry">
          <Form.Label className="required-label">
            <i className="bi bi-globe me-2"></i>
            Country *
          </Form.Label>
          <InputGroup className="is-invalid">
            <Form.Select>
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

        {/* Zip Code Field */}
        <Form.Group className="mb-4" controlId="formZipCode">
          <Form.Label className="required-label">
            <i className="bi bi-mailbox me-2"></i>
            Zip Code *
          </Form.Label>
          <InputGroup className="is-invalid">
            <Form.Control
              type="text"
              placeholder="Enter your zip/postal code"
            />
            <InputGroup.Text className="bg-white border-start-0 text-danger">
              <i className="bi bi-exclamation-circle-fill"></i>
            </InputGroup.Text>
          </InputGroup>
          <Form.Text className="text-danger">Zip code is required</Form.Text>
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
            variant="success" 
            className="profile-finish-btn"
            onClick={onFinish}
          >
            Finish
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default AddressForm;

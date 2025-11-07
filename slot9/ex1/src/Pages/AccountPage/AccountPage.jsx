import React, { useState } from 'react';
import { Container, ProgressBar, Nav, Button } from 'react-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';
import AboutForm from '../../Component/AboutForm/AboutForm';
import AccountForm from '../../Component/AccountForm/AccountForm';
import AddressForm from '../../Component/AddressForm/AddressForm';
import './AccountPage.css';

function AccountPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [activeTab, setActiveTab] = useState('about');

  const steps = [
    { id: 1, name: 'About', icon: 'bi-person-circle', progress: 33 },
    { id: 2, name: 'Account', icon: 'bi-lock', progress: 67 },
    { id: 3, name: 'Address', icon: 'bi-geo-alt', progress: 100 }
  ];

  const handleNext = () => {
    if (currentStep < 3) {
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);
      
      if (nextStep === 2) {
        setActiveTab('account');
      } else if (nextStep === 3) {
        setActiveTab('address');
      }
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      const prevStep = currentStep - 1;
      setCurrentStep(prevStep);
      
      if (prevStep === 1) {
        setActiveTab('about');
      } else if (prevStep === 2) {
        setActiveTab('account');
      }
    }
  };

  const handleFinish = () => {
    
    alert('Profile completed successfully!');
  };

  const handleTabClick = (tabKey) => {
    setActiveTab(tabKey);
    if (tabKey === 'about') setCurrentStep(1);
    else if (tabKey === 'account') setCurrentStep(2);
    else if (tabKey === 'address') setCurrentStep(3);
  };

  const currentStepData = steps.find(step => step.id === currentStep);

  return (
    <Container className="account-page-container">
      <div className="profile-form-modal">
        {/* Header */}
        <div className="form-header-profile">
          <div className="d-flex align-items-center">
            <i className={`bi ${currentStepData?.icon} me-2 profile-icon`}></i>
            <h2 className="mb-0">Build Your Profile</h2>
          </div>
          <Button variant="outline-secondary" className="close-btn-profile">
            <i className="bi bi-x-lg"></i>
          </Button>
        </div>

        {/* Progress Bar */}
        <div>
          
        <ProgressBar 
          now={currentStepData?.progress || 33} 
          label={`${currentStepData?.progress || 33}%`}
          className="mb-4 profile-progress-bar" 
        />
        
        </div>
        {/* Navigation Tabs */}
        <Nav variant="tabs" className="mb-4 profile-nav-tabs">
          <Nav.Item>
            <Nav.Link 
              eventKey="about" 
              active={activeTab === 'about'}
              onClick={() => handleTabClick('about')}
            >
              <i className="bi bi-person-circle me-1"></i>
              About
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link 
              eventKey="account" 
              active={activeTab === 'account'}
              onClick={() => handleTabClick('account')}
            >
              <i className="bi bi-lock me-1"></i>
              Account
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link 
              eventKey="address" 
              active={activeTab === 'address'}
              onClick={() => handleTabClick('address')}
            >
              <i className="bi bi-geo-alt me-1"></i>
              Address
            </Nav.Link>
          </Nav.Item>
        </Nav>

        {/* Form Content */}
        <div className="form-content">
          {activeTab === 'about' && (
            <AboutForm 
              onNext={handleNext}
              onPrevious={handlePrevious}
              isFirstStep={currentStep === 1}
            />
          )}
          {activeTab === 'account' && (
            <AccountForm 
              onNext={handleNext}
              onPrevious={handlePrevious}
            />
          )}
          {activeTab === 'address' && (
            <AddressForm 
              onPrevious={handlePrevious}
              onFinish={handleFinish}
            />
          )}
        </div>
      </div>
    </Container>
  );
}

export default AccountPage;

import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './FPTUniversity.css';

const FPTUniversity = () => {
  return (
    <div className="fpt-wrapper">
      {/* Header */}
      <header className="fpt-header">
        <div className="container-fluid">
          <div className="logo-section text-center">
            <div className="logo-container">
              <div className="fpt-logo">
                <img src="/FPTUniversitylogo.png" alt="FPT University Logo" />
              </div>
            </div>
          </div>

          <nav className="navbar navbar-expand-lg main-navigation">
            <div className="container-fluid justify-content-center">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <a className="nav-link active" href="#home">Home</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#about">About</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#contact">Contact</a>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="fpt-content">
        <div className="container">
          <section id="about" className="content-section">
            <h2 className="section-title">About</h2>
            <p className="section-text">This is the about section of the website.</p>
          </section>

          <section id="contact" className="content-section">
            <h2 className="section-title">Contact</h2>
            <p className="section-text">
              For any inquiries, please contact us at example@example.com.
            </p>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="fpt-footer">
        <div className="container">
          <p className="footer-text mb-0">© 2023 Website. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default FPTUniversity;
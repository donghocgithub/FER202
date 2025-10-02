import { useState } from 'react';
import { MapPin, Phone, Smartphone, Youtube, Facebook, Linkedin, Twitter, Mail } from 'lucide-react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/fpt-students.css'; // Đảm bảo đường dẫn CSS đúng với cấu trúc dự án

const FPTStudents = () => {
  const [students, setStudents] = useState([
    {
      id: 'DE160162',
      name: 'Nguyễn Hữu Quốc Khánh',
      location: 'danang',
      status: 'absent',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    },
    {
      id: 'DE160377',
      name: 'Choy Vinh Triện',
      location: 'quangnam',
      status: 'present',
      image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop',
    },
    {
      id: 'DE160547',
      name: 'Đỗ Nguyên Phúc',
      location: 'quangnam',
      status: 'absent',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
    },
    {
      id: 'DE170069',
      name: 'Lê Hoàng Minh',
      location: 'danang',
      status: 'present',
      image: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=400&h=400&fit=crop',
    },
  ]);

  const handleLocationChange = (index, location) => {
    const updatedStudents = [...students];
    updatedStudents[index].location = location;
    setStudents(updatedStudents);
  };

  const handleStatusChange = (index, status) => {
    const updatedStudents = [...students];
    updatedStudents[index].status = status;
    setStudents(updatedStudents);
  };

  const handleSubmit = (student) => {
    console.log('Submitted:', student);
    alert(`Submitted: ${student.name}\nID: ${student.id}\nLocation: ${student.location}\nStatus: ${student.status}`);
  };

  return (
    <div className="fpt-students-wrapper">
      {/* Header */}
      <header className="fpt-students-header">
        <div className="container-fluid">
          <div className="row align-items-center">
            {/* Logo */}
            <div className="col-md-2">
              <div className="fpt-logo-small">
                <span className="logo-letter logo-f-small">F</span>
                <span className="logo-letter logo-p-small">P</span>
                <span className="logo-letter logo-t-small">T</span>
                <span className="logo-university-small">UNIVERSITY</span>
              </div>
            </div>

            {/* Navigation */}
            <div className="col-md-7">
              <nav className="navbar navbar-expand-lg p-0">
                <ul className="navbar-nav nav-menu">
                  <li className="nav-item">
                    <a className="nav-link" href="#home">Home</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#about">About</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link active" href="#students">Students</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#news">News</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#contact">Contact</a>
                  </li>
                </ul>
              </nav>
            </div>

            {/* Search */}
            <div className="col-md-3">
              <div className="search-box">
                <input
                  type="text"
                  className="form-control search-input"
                  placeholder="Search"
                  aria-label="Search students"
                />
                <button className="btn search-btn">Search</button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Banner */}
      <section className="banner-section">
        <img
          src="https://images.unsplash.com/photo-1632834380561-d1e05839a33a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwc3R1ZGVudHMlMjBjYW1wdXN8ZW58MXx8fHwxNzU5MjkzMDc5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="FPT Students Campus"
          className="banner-image"
        />
      </section>

      {/* Breadcrumb */}
      <div className="breadcrumb-section">
        <div className="container">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb mb-0">
              <li className="breadcrumb-item"><a href="#home">Home</a></li>
              <li className="breadcrumb-item active" aria-current="page">Students</li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Main Content - Students Detail */}
      <main className="students-content">
        <div className="container">
          <h2 className="page-title">Students Detail</h2>

          <div className="row students-grid">
            {students.map((student, index) => (
              <div key={student.id} className="col-md-6 mb-4">
                <div className="student-card">
                  <div className="row g-0">
                    {/* Student Photo */}
                    <div className="col-5">
                      <div className="student-photo-container">
                        <img
                          src={student.image}
                          alt={`${student.name}'s photo`}
                          className="student-photo"
                        />
                      </div>
                    </div>

                    {/* Student Info */}
                    <div className="col-7">
                      <div className="student-info">
                        <div className="student-id">{student.id}</div>
                        <div className="student-name">{student.name}</div>

                        {/* Location Radio Buttons */}
                        <div className="radio-group">
                          <div className="form-check form-check-inline">
                            <input
                              className="form-check-input"
                              type="radio"
                              name={`location-${index}`}
                              id={`danang-${index}`}
                              checked={student.location === 'danang'}
                              onChange={() => handleLocationChange(index, 'danang')}
                            />
                            <label className="form-check-label" htmlFor={`danang-${index}`}>
                              Đà Nẵng
                            </label>
                          </div>
                          <div className="form-check form-check-inline">
                            <input
                              className="form-check-input"
                              type="radio"
                              name={`location-${index}`}
                              id={`quangnam-${index}`}
                              checked={student.location === 'quangnam'}
                              onChange={() => handleLocationChange(index, 'quangnam')}
                            />
                            <label className="form-check-label" htmlFor={`quangnam-${index}`}>
                              Quảng Nam
                            </label>
                          </div>
                        </div>

                        {/* Status Radio Buttons */}
                        <div className="radio-group">
                          <div className="form-check form-check-inline">
                            <input
                              className="form-check-input"
                              type="radio"
                              name={`status-${index}`}
                              id={`absent-${index}`}
                              checked={student.status === 'absent'}
                              onChange={() => handleStatusChange(index, 'absent')}
                            />
                            <label className="form-check-label" htmlFor={`absent-${index}`}>
                              Absent
                            </label>
                          </div>
                          <div className="form-check form-check-inline">
                            <input
                              className="form-check-input"
                              type="radio"
                              name={`status-${index}`}
                              id={`present-${index}`}
                              checked={student.status === 'present'}
                              onChange={() => handleStatusChange(index, 'present')}
                            />
                            <label className="form-check-label" htmlFor={`present-${index}`}>
                              Present
                            </label>
                          </div>
                        </div>

                        {/* Submit Button */}
                        <button
                          className="btn btn-submit"
                          onClick={() => handleSubmit(student)}
                        >
                          Submit
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="fpt-students-footer">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <div className="footer-address">
                <h5 className="footer-heading">Our Address</h5>
                <p className="mb-1 d-flex align-items-center">
                  <MapPin size={16} className="me-2" />
                  Lô E2a-7, Đường D1 Khu Công nghệ cao, P. Tân Phú, Q. 9, TP. Hồ Chí Minh
                </p>
                <p className="mb-1 d-flex align-items-center">
                  <Phone size={16} className="me-2" />
                  0236-3710-999
                </p>
                <p className="mb-0 d-flex align-items-center">
                  <Smartphone size={16} className="me-2" />
                  0901-324-325
                </p>
              </div>
            </div>
            <div className="col-md-6 text-md-end">
              <div className="social-icons">
                <a href="#facebook" className="social-icon" aria-label="Facebook">
                  <Facebook size={18} />
                </a>
                <a href="#twitter" className="social-icon" aria-label="Twitter">
                  <Twitter size={18} />
                </a>
                <a href="#linkedin" className="social-icon" aria-label="LinkedIn">
                  <Linkedin size={18} />
                </a>
                <a href="#youtube" className="social-icon" aria-label="YouTube">
                  <Youtube size={18} />
                </a>
                <a href="#email" className="social-icon" aria-label="Email">
                  <Mail size={18} />
                </a>
              </div>
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-12 text-center">
              <p className="copyright mb-0">© Copyright {new Date().getFullYear()}</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default FPTStudents;
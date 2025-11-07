// GridTest.jsx
import 'bootstrap/dist/css/bootstrap.min.css'; // import Bootstrap đúng
import './grid-test.css'; // import CSS riêng

const GridTest = () => {
  return (
    <div className="grid-test-wrapper">

      {/* Main Content - Grid */}
      <main className="grid-content">
        <div className="container-fluid">
          <div className="grid-container">
            {/* Row 1 - 2 columns */}
            <div className="row mb-3">
              <div className="col-md-6">
                <div className="grid-box">First col</div>
              </div>
              <div className="col-md-6">
                <div className="grid-box">Second col</div>
              </div>
            </div>

            {/* Row 2 - 3 columns */}
            <div className="row mb-3">
              <div className="col-md-4">
                <div className="grid-box">Col</div>
              </div>
              <div className="col-md-4">
                <div className="grid-box">Col</div>
              </div>
              <div className="col-md-4">
                <div className="grid-box">Col</div>
              </div>
            </div>

            {/* Row 3 - 4 columns */}
            <div className="row mb-3">
              <div className="col-md-3">
                <div className="grid-box">Col</div>
              </div>
              <div className="col-md-3">
                <div className="grid-box">Col</div>
              </div>
              <div className="col-md-3">
                <div className="grid-box">Col</div>
              </div>
              <div className="col-md-3">
                <div className="grid-box">Col</div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="grid-footer">
        <div className="container-fluid">
          <p className="footer-text">Created by ABC!</p>
        </div>
      </footer>
    </div>
  );
};

export default GridTest;

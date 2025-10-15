import React, { useState } from 'react';

const CounterComponent = () => {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    setCount(count - 1);
  };

  const reset = () => {
    setCount(0);
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card" style={{ backgroundColor: '#f8f9fa' }}>
            <div className="card-body text-center">
              <h2 className="card-title mb-4">Counter Component</h2>
              <div className="mb-4">
                <h1 className="display-4 text-primary">{count}</h1>
              </div>
              <div className="btn-group" role="group">
                <button 
                  className="btn btn-danger" 
                  onClick={decrement}
                >
                  -
                </button>
                <button 
                  className="btn btn-secondary" 
                  onClick={reset}
                >
                  Reset
                </button>
                <button 
                  className="btn btn-success" 
                  onClick={increment}
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CounterComponent;
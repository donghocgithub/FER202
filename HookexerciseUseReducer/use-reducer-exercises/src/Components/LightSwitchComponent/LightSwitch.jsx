import React, { useReducer } from 'react';
import { Button, Card } from 'react-bootstrap';

// Khởi tạo trạng thái ban đầu
const initialState = { isLightOn: false };

// Định nghĩa hàm reducer
function reducer(state, action) {
  switch (action.type) {
    case 'TOGGLE_LIGHT':
      return { isLightOn: !state.isLightOn };
    
    case 'RESET':
      return initialState;
    
    default:
      return state;
  }
}

function LightSwitch() {
  // Sử dụng useReducer để quản lý trạng thái
  const [state, dispatch] = useReducer(reducer, initialState);

  // Action handlers
  const toggleLight = () => dispatch({ type: 'TOGGLE_LIGHT' });
  const resetLight = () => dispatch({ type: 'RESET' });

  return (
    <Card style={{ padding: '20px', textAlign: 'center' }}>
      <h2>Công Tắc Đèn</h2>
      
      <p style={{ fontSize: '24px', fontWeight: 'bold' }}>
        Đèn hiện đang: {state.isLightOn ? 'Bật' : 'Tắt'}
      </p>
      
      <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
        <Button
          onClick={toggleLight}
          style={{
            padding: '10px 20px',
            borderRadius: '6px',
            border: 'none',
            cursor: 'pointer',
            fontWeight: 'bold',
            fontSize: '16px',
            background: state.isLightOn ? '#28a745' : '#6c757d',
            color: 'white'
          }}
        >
          {state.isLightOn ? 'Tắt Đèn' : 'Bật Đèn'}
        </Button>

        <Button
          onClick={resetLight}
          variant="outline-danger"
          style={{
            padding: '10px 20px',
            borderRadius: '6px',
            fontWeight: 'bold',
            fontSize: '16px'
          }}
        >
          Reset
        </Button>
      </div>
    </Card>
  );
}

export default LightSwitch;
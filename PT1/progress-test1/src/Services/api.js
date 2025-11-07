import axios from 'axios';
// Cấu hình Base URL cho JSON Server
// Giả định JSON Server đang chạy trên cổng 3001 
const API = axios.create({
  baseURL: 'http://localhost:3001',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getUsers = async () => {
    try {
        const response = await API.get('/users');
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch users');
    }
};

// Payments API
export const getPayments = async () => {
  try {
    const res = await API.get('/payments');
    return res.data;
  } catch (err) {
    throw new Error('Failed to fetch payments');
  }
};

export const getPaymentById = async (id) => {
  try {
    const res = await API.get(`/payments/${id}`);
    return res.data;
  } catch (err) {
    throw new Error('Failed to fetch payment');
  }
};

export const createPayment = async (payload) => {
  try {
    const res = await API.post('/payments', payload);
    return res.data;
  } catch (err) {
    throw new Error('Failed to create payment');
  }
};

export const updatePayment = async (id, payload) => {
  try {
    const res = await API.put(`/payments/${id}`, payload);
    return res.data;
  } catch (err) {
    throw new Error('Failed to update payment');
  }
};

export const deletePayment = async (id) => {
  try {
    const res = await API.delete(`/payments/${id}`);
    return res.data;
  } catch (err) {
    throw new Error('Failed to delete payment');
  }
};

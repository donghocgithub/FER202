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

export const getUserById = async (id) => {
    try {
        const response = await API.get(`/users/${id}`);
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch user');
    }
};

export const updateUserStatus = async (id, status) => {
    try {
        const user = await getUserById(id);
        const response = await API.patch(`/users/${id}`, { status });
        return response.data;
    } catch (error) {
        throw new Error('Failed to update user status');
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

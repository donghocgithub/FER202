import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';
import * as api from '../Services/api';

const PaymentContext = createContext();

export const usePayment = () => {
    const context = useContext(PaymentContext);
    if (!context) {
        throw new Error('usePayment must be used within a PaymentProvider');
    }
    return context;
};

export const PaymentProvider = ({ children }) => {
  const [payments, setPayments] = useState([]);
  const [currentPayment, setCurrentPayment] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Add filter state
  const [filterState, setFilterState] = useState({
    searchTerm: '',
    semester: '',
    courseName: '',
    sortBy: 'date_desc',
    semesterOptions: [],
    courseOptions: []
  });

  const fetchPayments = async () => {
    setLoading(true);
    try {
      const data = await api.getPayments();
      // Normalize dates and add numeric timestamp to ensure reliable sorting
      const normalized = (data || []).map(p => {
        const rawDate = p.date || '';
        let isoDate = rawDate;
        let ts = 0;
        const d = new Date(rawDate);
        if (!isNaN(d.getTime())) {
          isoDate = d.toISOString().split('T')[0];
          ts = d.getTime();
        }
        return {
          ...p,
          date: isoDate,
          dateTs: ts,
        };
      });
      setPayments(normalized);
    } catch (err) {
      setError(err.message || 'Failed to fetch payments');
    } finally {
      setLoading(false);
    }
  };

  const fetchPaymentById = async (id) => {
    setLoading(true);
    try {
      const data = await api.getPaymentById(id);
      if (data) {
        const d = new Date(data.date || '');
        const isoDate = !isNaN(d.getTime()) ? d.toISOString().split('T')[0] : data.date || '';
        const withDate = { ...data, date: isoDate };
        setCurrentPayment(withDate);
        return withDate;
      }
      setCurrentPayment(null);
      return null;
    } catch (err) {
      setError(err.message || 'Failed to fetch payment');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const createPayment = async (payload) => {
    setLoading(true);
    try {
      const created = await api.createPayment(payload);
      setPayments((p) => [created, ...p]);
      return created;
    } catch (err) {
      setError(err.message || 'Failed to create payment');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updatePayment = async (id, payload) => {
    setLoading(true);
    try {
      const updated = await api.updatePayment(id, payload);
      setPayments((p) => p.map((it) => (String(it.id) === String(id) ? updated : it)));
      if (String(currentPayment?.id) === String(id)) setCurrentPayment(updated);
      return updated;
    } catch (err) {
      setError(err.message || 'Failed to update payment');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deletePayment = async (id) => {
    setLoading(true);
    try {
      await api.deletePayment(id);
      setPayments((p) => p.filter((it) => String(it.id) !== String(id)));
      if (String(currentPayment?.id) === String(id)) setCurrentPayment(null);
      return true;
    } catch (err) {
      setError(err.message || 'Failed to delete payment');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Update filter options when payments change
  useEffect(() => {
    const semesters = [...new Set(payments.map(p => p.semester))].sort();
    const courses = [...new Set(payments.map(p => p.courseName))].sort();
    setFilterState(prev => ({
      ...prev,
      semesterOptions: semesters,
      courseOptions: courses
    }));
  }, [payments]);

  useEffect(() => {
    fetchPayments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Filtered and sorted payments
  const filteredPayments = useMemo(() => {
    return payments
      .filter(payment => {
        const matchesSearch = filterState.searchTerm === '' || 
          payment.semester.toLowerCase().includes(filterState.searchTerm.toLowerCase()) ||
          payment.courseName.toLowerCase().includes(filterState.searchTerm.toLowerCase());
        
        const matchesSemester = filterState.semester === '' || payment.semester === filterState.semester;
        const matchesCourse = filterState.courseName === '' || payment.courseName === filterState.courseName;
        
        return matchesSearch && matchesSemester && matchesCourse;
      })
      .sort((a, b) => {
        switch(filterState.sortBy) {
          case 'course_asc':
            return a.courseName.localeCompare(b.courseName);
          case 'course_desc':
            return b.courseName.localeCompare(a.courseName);
          case 'date_asc':
            return (a.dateTs || Date.parse(a.date) || 0) - (b.dateTs || Date.parse(b.date) || 0);
          case 'date_desc':
            return (b.dateTs || Date.parse(b.date) || 0) - (a.dateTs || Date.parse(a.date) || 0);
          case 'amount_asc':
            return a.amount - b.amount;
          case 'amount_desc':
            return b.amount - a.amount;
          default:
            return 0;
        }
      });
  }, [payments, filterState]);

  const value = {
    payments: filteredPayments,
    currentPayment,
    loading,
    error,
    filterState,
    setFilterState,
    fetchPayments,
    fetchPaymentById,
    createPayment,
    updatePayment,
    deletePayment,
  };

  return <PaymentContext.Provider value={value}>{children}</PaymentContext.Provider>;
};

export default PaymentContext;

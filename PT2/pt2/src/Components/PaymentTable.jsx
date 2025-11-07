import React, { useEffect } from 'react';
import { Table, Button, Spinner } from 'react-bootstrap';
import { usePayment } from '../Contexts/PaymentContext';
import { useNavigate } from 'react-router-dom';

const PaymentTable = () => {
  const { payments, loading, fetchPayments, deletePayment } = usePayment();
  const navigate = useNavigate();

  useEffect(() => {
    fetchPayments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleView = (id) => navigate(`/payments/${id}`);
  const handleEdit = (id) => navigate(`/payments/${id}/edit`);
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this payment?')) return;
    try {
      await deletePayment(id);
    } catch (err) {
      // simple alert; could be improved with a toast
      alert(err.message || 'Failed to delete');
    }
  };

  if (loading) return <Spinner animation="border" />;

  return (
    <Table bordered hover responsive>
      <thead>
        <tr>
          <th>Semester</th>
          <th>Course</th>
          <th>Amount</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {payments && payments.length > 0 ? (
          payments.map((p) => (
            <tr key={p.id}>
              <td>{p.semester}</td>
              <td>{p.courseName}</td>
              <td>{p.amount}</td>
              <td style={{ display: 'flex', gap: 8 }}>
                <Button size="sm" variant="info" onClick={() => handleView(p.id)}>
                  View Details
                </Button>
                <Button size="sm" variant="warning" onClick={() => handleEdit(p.id)}>
                  Edit
                </Button>
                <Button size="sm" variant="danger" onClick={() => handleDelete(p.id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={4} className="text-center">
              No payments found
            </td>
          </tr>
        )}
      </tbody>
    </Table>
  );
};

export default PaymentTable;

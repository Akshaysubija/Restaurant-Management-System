
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PaymentsPage = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user || !user.token) {
          setError('User not authenticated');
          setLoading(false);
          return;
        }

        const res = await axios.get('http://localhost:5000/api/payments', {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });

        setPayments(res.data);
      } catch (err) {
        console.error('Error fetching payments:', err);
        setError('Failed to fetch payments');
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">💳 Payment Records</h2>

      {loading ? (
        <p>Loading payments...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : payments.length === 0 ? (
        <p>No payment records found.</p>
      ) : (
        <table className="min-w-full bg-white shadow rounded-md">
          <thead>
            <tr>
              <th className="py-2 px-4 border">Name</th>
              <th className="py-2 px-4 border">Amount</th>
              <th className="py-2 px-4 border">Status</th>
              <th className="py-2 px-4 border">Invoice</th>
              <th className="py-2 px-4 border">Date</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment) => (
              <tr key={payment._id}>
                <td className="py-2 px-4 border">{payment.user?.name || 'N/A'}</td>
                <td className="py-2 px-4 border">₹ {payment.amount}</td>
                <td className="py-2 px-4 border">
                  {payment.isPaid ? '✅ Paid' : '❌ Pending'}
                </td>
                <td className="py-2 px-4 border">
                  {payment.invoiceUrl ? (
                    <a
                      href={payment.invoiceUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-600 underline"
                    >
                      Download
                    </a>
                  ) : (
                    'No Invoice'
                  )}
                </td>
                <td className="py-2 px-4 border">
                  {new Date(payment.createdAt).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default PaymentsPage;

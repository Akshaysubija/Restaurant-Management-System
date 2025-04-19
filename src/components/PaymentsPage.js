
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import '../App.css';

// const PaymentsPage = () => {
//   const [payments, setPayments] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     const fetchPayments = async () => {
//       try {
//         // Ensure that we are correctly retrieving the user and token from localStorage
//         const rawUser = localStorage.getItem('user');
//         const token = localStorage.getItem('token');

//         if (!rawUser || !token) {
//           setError('User not authenticated');
//           setLoading(false);
//           return;
//         }

//         // Fetch payments from API with the token
//         const res = await axios.get('http://localhost:5000/api/payments', {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         // Store the payments data in the state
//         setPayments(res.data);
//       } catch (err) {
//         console.error('Error fetching payments:', err);
//         setError('Failed to fetch payments');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPayments();
//   }, []);

//   return (
//     <div className="payment-page-container">
//       <h2 className="text-2xl font-bold mb-4">💳 Payment Records</h2>

//       {loading ? (
//         <p className="loading">Loading payments...</p>
//       ) : error ? (
//         <p className="error">{error}</p>
//       ) : payments.length === 0 ? (
//         <p className="no-records">No payment records found.</p>
//       ) : (
//         <table>
//           <thead>
//             <tr>
//               <th className="py-2 px-4 border">Name</th>
//               <th className="py-2 px-4 border">Amount</th>
//               <th className="py-2 px-4 border">Status</th>
//               <th className="py-2 px-4 border">Invoice</th>
//               <th className="py-2 px-4 border">Date</th>
//             </tr>
//           </thead>
//           <tbody>
//             {payments.map((payment) => (
//               <tr key={payment._id}>
//                 <td className="py-2 px-4 border">{payment.user?.name || 'N/A'}</td>
//                 <td className="py-2 px-4 border">₹ {payment.amount}</td>
//                 <td className="py-2 px-4 border">
//                   {payment.isPaid ? '✅ Paid' : '❌ Pending'}
//                 </td>
//                 <td className="py-2 px-4 border">
//                   {payment.invoiceUrl ? (
//                     <a
//                       href={payment.invoiceUrl}
//                       target="_blank"
//                       rel="noreferrer"
//                       className="text-blue-600 underline"
//                     >
//                       Download
//                     </a>
//                   ) : (
//                     'No Invoice Available'
//                   )}
//                 </td>
//                 <td className="py-2 px-4 border">
//                   {new Date(payment.createdAt).toLocaleString()}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

// export default PaymentsPage;








import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../App.css';


const PaymentsPage = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const rawUser = localStorage.getItem('user');
        const token = localStorage.getItem('token');

        if (!rawUser || !token) {
          setError('User not authenticated');
          setLoading(false);
          return;
        }

        const res = await axios.get('http://localhost:5000/api/payments', {
          headers: {
            Authorization: `Bearer ${token}`,
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
    <div className="full-background">
      <div className="payment-page-container">
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
                      'No Invoice Available'
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
    </div>
  );
};

export default PaymentsPage;


// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import '../App.css';


// const OrdersPage = () => {
//   const [orders, setOrders] = useState([]);

//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         const res = await axios.get('http://localhost:5000/api/orders/myorders', {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setOrders(res.data);
//       } catch (err) {
//         console.error('Error fetching orders:', err);
//       }
//     };

//     fetchOrders();
//   }, []);

//   return (
//     <div className="orders-page">
//       <h2 className="orders-title">My Orders</h2>
//       {orders.length === 0 ? (
//         <p>No orders found.</p>
//       ) : (
//         <div>
//           {orders.map((order) => (
//             <div key={order._id} className="order-card">
//               <div className="order-details">
//                 <p><strong>Status:</strong> {order.status}</p>
//                 <p><strong>Total Price:</strong> ₹{order.totalPrice || 'N/A'}</p>
//                 <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleString()}</p>
//               </div>

//               <div className="order-items">
//                 <p className="order-items-title">Items:</p>
//                 <ul className="order-items-list">
//                   {order.items.map((item) => (
//                     <li key={item._id} className="order-item">
//                       {item.menuItem?.image && (
//                         <img
//                           src={item.menuItem.image}
//                           alt={item.menuItem.name}
//                         />
//                       )}
//                       <p className="order-item-name">{item.menuItem?.name || 'Unknown Item'}</p>
//                       <p className="order-item-info">Qty: {item.quantity}</p>
//                       <p className="order-item-info">₹{item.price}</p>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default OrdersPage;










import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../App.css';

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5000/api/orders/myorders', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrders(res.data);
      } catch (err) {
        console.error('Error fetching orders:', err);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="orders-background">
      <div className="orders-page">
        <h2 className="orders-title">My Orders</h2>
        {orders.length === 0 ? (
          <p>No orders found.</p>
        ) : (
          <div>
            {orders.map((order) => (
              <div key={order._id} className="order-card">
                <div className="order-details">
                  <p><strong>Status:</strong> {order.status}</p>
                  <p><strong>Total Price:</strong> ₹{order.totalPrice || 'N/A'}</p>
                  <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleString()}</p>
                </div>

                <div className="order-items">
                  <p className="order-items-title">Items:</p>
                  <ul className="order-items-list">
                    {order.items.map((item) => (
                      <li key={item._id} className="order-item">
                        {item.menuItem?.image && (
                          <img
                            src={item.menuItem.image}
                            alt={item.menuItem.name}
                          />
                        )}
                        <p className="order-item-name">{item.menuItem?.name || 'Unknown Item'}</p>
                        <p className="order-item-info">Qty: {item.quantity}</p>
                        <p className="order-item-info">₹{item.price}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersPage;

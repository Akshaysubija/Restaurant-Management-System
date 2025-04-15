import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

const OrdersPage = () => {
  const { user } = useAuth(); // Get user & token from context
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get('/api/orders', {
          headers: {
            Authorization: `Bearer ${user.token}`
          }
        });
        setOrders(res.data);
      } catch (err) {
        toast.error('Failed to fetch orders');
      }
    };

    if (user?.token) fetchOrders();
  }, [user]);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await axios.put(`/api/orders/${orderId}/status`, {
        deliveryStatus: newStatus,
      }, {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      });

      setOrders(prev =>
        prev.map(order =>
          order._id === orderId ? { ...order, deliveryStatus: newStatus } : order
        )
      );

      toast.success('Order status updated!');
    } catch (err) {
      toast.error('Failed to update status');
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Your Orders</h2>

      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="grid gap-4">
          {orders.map(order => (
            <div key={order._id} className="bg-white shadow-md p-4 rounded-xl border">
              <p><strong>Order ID:</strong> {order._id}</p>
              <p><strong>Items:</strong> {order.items.map(i => `${i.name} x${i.quantity}`).join(', ')}</p>
              <p><strong>Total:</strong> ₹{order.totalAmount}</p>
              <p><strong>Status:</strong> {order.deliveryStatus}</p>

              {user.role !== 'user' && (
                <div className="mt-2">
                  <label className="mr-2 font-semibold">Update Status:</label>
                  <select
                    value={order.deliveryStatus}
                    onChange={(e) => handleStatusChange(order._id, e.target.value)}
                    className="border rounded px-2 py-1"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Preparing">Preparing</option>
                    <option value="Out for delivery">Out for delivery</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrdersPage;

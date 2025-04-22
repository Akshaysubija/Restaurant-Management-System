
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../App.css';
import { useNavigate } from 'react-router-dom';

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [updatedQuantities, setUpdatedQuantities] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetchOrders();
  }, []);

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

  const handlePayNow = (orderId) => {
    navigate('/payments', { state: { orderId } });
  };

  const handleQuantityChange = (orderId, menuItemId, quantity) => {
    setUpdatedQuantities((prev) => ({
      ...prev,
      [`${orderId}-${menuItemId}`]: quantity,
    }));
  };

  const updateQuantity = async (orderId, menuItemId, originalQuantity) => {
    const token = localStorage.getItem('token');
    const updatedQuantity = updatedQuantities[`${orderId}-${menuItemId}`] || originalQuantity;

    try {
      await axios.put(
        `http://localhost:5000/api/orders/${orderId}/update-item`,
        {
          orderId,
          menuItemId,
          quantity: Number(updatedQuantity),
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      fetchOrders(); // Refresh orders after update
    } catch (err) {
      console.error('Error updating quantity:', err.response?.data || err.message);
    }
  };

  const handleDeleteItem = async (orderId, menuItemId) => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(
        `http://localhost:5000/api/orders/${orderId}/delete-item/${menuItemId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchOrders(); // Refresh after deletion
    } catch (err) {
      console.error('Error deleting item:', err.response?.data || err.message);
    }
  };

  return (
    <div className="orders-background">
      <div className="orders-page">
        <h2 className="orders-title">My Orders</h2>
        {orders.length === 0 ? (
          <p>No orders found.</p>
        ) : (
          orders.map((order) => (
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
                      <p className="order-item-info">₹{item.price}</p>

                      {/* Quantity Update */}
                      <div className="quantity-update">
                        <input
                          type="number"
                          min="1"
                          value={
                            updatedQuantities[`${order._id}-${item.menuItem._id}`] ??
                            item.quantity
                          }
                          onChange={(e) =>
                            handleQuantityChange(order._id, item.menuItem._id, e.target.value)
                          }
                        />
                        <button
                          onClick={() =>
                            updateQuantity(order._id, item.menuItem._id, item.quantity)
                          }
                        >
                          Update
                        </button>

                        {/* Delete Button */}
                        <button
                          className="delete-button"
                          onClick={() => handleDeleteItem(order._id, item.menuItem._id)}
                        >
                          Delete
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {order.status === 'Pending' && (
                <button className="pay-button" onClick={() => handlePayNow(order._id)}>
                  Pay Now
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default OrdersPage;

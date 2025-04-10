

import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  items: [{
    menuItem: { type: mongoose.Schema.Types.ObjectId, ref: 'Menu' },
    quantity: { type: Number, required: true }
  }],
  totalAmount: { type: Number, required: true },
  status: { type: String, default: 'Pending' },
  deliveryStatus: { type: String, default: 'Not assigned' }, // Default value
});

const Order = mongoose.model('Order', orderSchema);

export default Order;  // Use default export

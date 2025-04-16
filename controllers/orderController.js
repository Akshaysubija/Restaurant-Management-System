
// controllers/orderController.js
import Order from '../models/Order.js';
import { generateInvoice } from '../utils/invoiceGenerator.js';

export const placeOrder = async (req, res) => {
  try {
    const order = await Order.create({ ...req.body, user: req.user.id });
    res.status(201).json(order);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getUserOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user.id }).populate('items.menuItem');
  res.json(orders);
};

import path from 'path';
import { fileURLToPath } from 'url';

export const downloadInvoice = async (req, res) => {
  try {
    const orderId = req.params.id;
    const order = await Order.findById(orderId).populate('items.menuItem');

    if (!order) return res.status(404).json({ message: 'Order not found' });

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    const invoicePath = path.join(__dirname, `../invoices/invoice-${orderId}.pdf`);

    await generateInvoice(order, invoicePath);

    res.download(invoicePath, `invoice-${orderId}.pdf`);
  } catch (err) {
    res.status(500).json({ message: 'Error generating invoice', error: err.message });
  }
};





import Payment from '../models/Payment.js';
import User from '../models/User.js'; // Import User model for name lookup

// Create Payment
export const makePayment = async (req, res) => {
  const { amount, method, orderId } = req.body;
  try {
    const newPayment = new Payment({
      user: req.user._id,
      amount,
      method,
      order: orderId,
    });

    const savedPayment = await newPayment.save();
    res.status(201).json(savedPayment);
  } catch (error) {
    res.status(500).json({ message: 'Payment failed', error });
  }
};

// Get all Payments (formatted for frontend)
export const getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find({ user: req.user._id }).sort({ createdAt: -1 });

    const formattedPayments = await Promise.all(
      payments.map(async (payment) => {
        const user = await User.findById(payment.user);
        return {
          _id: payment._id,
          user: { name: user?.name || 'N/A' },
          amount: payment.amount,
          isPaid: payment.paymentStatus === 'Paid', // convert string to boolean
          invoiceUrl: payment.invoiceUrl || null,
          createdAt: payment.createdAt,
        };
      })
    );

    res.status(200).json(formattedPayments);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch payments', error });
  }
};








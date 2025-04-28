
import express from 'express';
import { createPayment, getUserPayments } from '../controllers/paymentController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// @route POST /api/payments
// @desc  Create a payment
router.post('/', protect, createPayment);

// @route GET /api/payments
// @desc  Get logged-in user's payment history
router.get('/', protect, getUserPayments);

export default router;



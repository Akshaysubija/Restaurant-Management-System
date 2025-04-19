
import express from 'express';
import { makePayment, getAllPayments } from '../controllers/paymentController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// GET all payments
router.get('/', protect, getAllPayments);

// POST new payment
router.post('/', protect, makePayment);

export default router;



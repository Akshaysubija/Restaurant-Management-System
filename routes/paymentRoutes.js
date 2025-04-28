
import express from 'express';
import { createPayment, getUserPayments } from '../controllers/paymentController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();


// Create a payment //
router.post('/', protect, createPayment);

// GET /api/payments //
router.get('/', protect, getUserPayments);

export default router;



// routes/paymentRoutes.js
import express from 'express';
import { makePayment } from '../controllers/paymentController.js';
import { protect } from '../middleware/authMiddleware.js';
const router = express.Router();
router.post('/', protect, makePayment);
export default router;

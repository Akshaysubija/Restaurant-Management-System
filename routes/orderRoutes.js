
// routes/orderRoutes.js
import express from 'express';
import { placeOrder, getUserOrders, downloadInvoice } from '../controllers/orderController.js'; // Ensure all functions are imported correctly
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();
router.post('/', protect, placeOrder);                    
router.get('/my-orders', protect, getUserOrders); // Make sure this is correctly defined
router.get('/invoice/:id', downloadInvoice); // GET /api/order/invoice/:id

export default router;

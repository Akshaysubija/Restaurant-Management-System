import express from 'express';
import { placeOrder, getUserOrders, downloadInvoice } from '../controllers/orderController.js';
import { protect } from '../middleware/authMiddleware.js';




const router = express.Router();

router.post('/', protect, placeOrder);
router.get('/myorders', protect, getUserOrders);
router.get('/invoice/:id', protect, downloadInvoice);



export default router;






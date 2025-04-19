// routes/authRoutes.js
// import express from 'express';
// import { register, login, getUserProfile } from '../controllers/authController.js'; // Correct named imports
// import { protect } from '../middleware/authMiddleware.js'; // Ensure this is correct as well



// const router = express.Router();

// router.post('/register', register);  // Handle registration
// router.post('/login', login);        // Handle login
// router.get('/profile', protect, getUserProfile);  // Protected route to get user profile

// export default router;




import express from 'express';
import { register, login, getUserProfile } from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public routes
router.post('/register', register);
router.post('/login', login);

// Protected route
router.get('/profile', protect, getUserProfile);

export default router;

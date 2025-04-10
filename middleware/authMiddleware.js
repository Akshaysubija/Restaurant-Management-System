
// In authMiddleware.js
// import jwt from 'jsonwebtoken';

// export const protect = (req, res, next) => {
//   const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
  
//   if (!token) {
//     return res.status(401).json({ message: 'No token provided' });
//   }
  
//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded;  
//     next();
//   } catch (error) {
//     res.status(401).json({ message: 'Invalid or expired token' });
//   }
// };


import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import asyncHandler from 'express-async-handler';

// Protect routes (require token)
const protect = asyncHandler(async (req, res, next) => {
  let token = req.headers.authorization?.split(' ')[1];

  if (token) {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select('-password');
    next();
  } else {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
});

// Admin check middleware
const admin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403);
    throw new Error('Not authorized as admin');
  }
};

export { protect, admin };

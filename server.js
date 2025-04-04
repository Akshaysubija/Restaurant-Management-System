require('dotenv').config(); 

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');  
const authRoutes = require('./routes/authRoutes');

const app = express();

// Middleware Connection //
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

// Connect to Database //
connectDB();

// Routes//
app.use('/api/auth', authRoutes);

// Start Server Code //
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

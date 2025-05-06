// server.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');

// Load environment variables from .env file
dotenv.config();

// Initialize the app
const app = express();
const cors = require('cors');

// Allow requests from React frontend
app.use(cors({
    origin: 'http://localhost:5173', // TODO: Change to your frontend URL
}));


app.use(express.json());
app.use('/api', authRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log('MongoDB connection error:', err));

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

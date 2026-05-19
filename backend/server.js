const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../frontend')));

const memoryDB = require('./store');

// Connect to MongoDB
const mongoURI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/localnest';
mongoose.connect(mongoURI)
    .then(() => {
        console.log('MongoDB connected successfully');
        memoryDB.dbConnected = true;
    })
    .catch(err => {
        console.error('MongoDB connection error, falling back to in-memory store.');
    });

// Routes
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/auth', require('./routes/authRoutes'));

// Fallback to index.html for unknown routes (SPA like behavior)
app.use((req, res) => {
    res.sendFile(path.join(__dirname, '../frontend', 'index.html'));
});

// Seed Initial Mock Data roughly if needed or start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

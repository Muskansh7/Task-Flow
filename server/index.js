const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// ======================
// Middleware
// ======================
app.use(cors());
app.use(express.json());

// ======================
// Database Connection
// ======================
mongoose.connect(process.env.MONGODB_URI, {
    serverSelectionTimeoutMS: 5000,
    bufferCommands: false
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => {
    console.error('MongoDB connection error:', err.message);
});

// ======================
// API Routes
// ======================
const authRoutes = require('./src/routes/authRoutes');
const taskRoutes = require('./src/routes/taskRoutes');
const flashcardRoutes = require('./src/routes/flashcardRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/flashcards', flashcardRoutes);

// ======================
// Serve Frontend (Production)
// ======================
const clientPath = path.join(__dirname, 'client-dist');

// Serve static files
app.use(express.static(clientPath));

// Catch-all route (Express 5 compatible)
app.use((req, res) => {
    res.sendFile(path.join(clientPath, 'index.html'));
});

// ======================
// Start Server
// ======================
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
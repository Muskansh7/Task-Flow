const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
mongoose.connect(process.env.MONGODB_URI, {
    serverSelectionTimeoutMS: 5000,
    bufferCommands: false
})
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => {
        console.error('MongoDB connection error. Switching to mock storage.');
        // mongoose.connection.readyState will be 0 or 2 here, which our controllers handle
    });

// Routes
app.get('/', (req, res) => {
    res.send('Task Management API is running...');
});

// Import Routes
const authRoutes = require('./src/routes/authRoutes');
const taskRoutes = require('./src/routes/taskRoutes');
const flashcardRoutes = require('./src/routes/flashcardRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/flashcards', flashcardRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

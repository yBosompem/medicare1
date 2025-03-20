const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const testRoutes = require('./routes/test');
const appointmentRoutes = require('./routes/appointment');
const authRoutes = require('./routes/auth');
const providerRoutes = require('./routes/provider');
const reviewRoutes = require('./routes/review');
const http = require('http');
const { Server } = require('socket.io');
const jwt = require('jsonwebtoken');
const auth = require('./middleware/auth');
const testRouter = require('./routes/test'); // Adjust the path as necessary
const socketHandlers = require('./socketHandlers'); // Import the handlers
const notificationRoutes = require('./routes/notification');


const connectDB = require('./config/db');

// Connect to MongoDB
connectDB();

// Create Express app
const app = express();

// Create HTTP server
const server = http.createServer(app);

// Set up Socket.IO
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:3000', // Update this in production
    methods: ['GET', 'POST'],
  },
});

// Middleware
app.use(cors());
app.use(express.json());

// Basic route
app.get('/', (req, res) => {
  res.send('Project-medicare is running!');
});

// Initialize Socket.IO handlers
socketHandlers(io);

// Routes
app.use('/api/notifications', notificationRoutes);
app.use('/api', testRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/providers', providerRoutes);
app.use('/api/reviews', reviewRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));



const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected');
  } catch (err) {
    console.log('Failed to connect to MongoDB:', err.message);
    process.exit(1); // Exit the process if the connection fails
  }
};

module.exports = connectDB;
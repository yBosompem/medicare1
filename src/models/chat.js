const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
  senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
  receiverId: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
  message: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model('chat', chatSchema);
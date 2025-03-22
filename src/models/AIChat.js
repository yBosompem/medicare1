const mongoose = require('mongoose');

const aiChatSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
  message: { type: String, required: true },
  response: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model('AIChat', aiChatSchema);
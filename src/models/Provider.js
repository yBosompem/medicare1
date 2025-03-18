const mongoose = require('mongoose');

const providerSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  speciality: { type: String, required: true },
  location: { type: String, required: true },
  bio: { type: String },
  profilePictureUrl: { type: String },
  verified: { type: Boolean, default: false },
});

module.exports = mongoose.model('Provider', providerSchema);
const mongoose = require('mongoose');

const insuranceSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  insuranceCarrier: { type: String, required: true },
  planName: { type: String, required: true },
  memberId: { type: String, required: true },
  photoUrl: { type: String },
});

module.exports = mongoose.model('Insurance', insuranceSchema);
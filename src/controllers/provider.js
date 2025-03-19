const Provider = require('../models/Provider');

// Get all providers
const getProviders = async (req, res) => {
  try {
    const providers = await Provider.find().populate('userId', 'firstName lastName');
    res.json(providers);
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

module.exports = { getProviders };
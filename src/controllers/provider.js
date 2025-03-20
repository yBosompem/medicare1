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

// get providers by ID
const getProviderById = async (req, res) => {
    try {
      const provider = await Provider.findById(req.params.id).populate('userId', 'firstName lastName');
      if (!provider) {
        return res.status(404).json({ message: 'Provider not found' });
      }
      res.json(provider);
    } catch (err) {
      res.status(500).json({ message: 'Something went wrong' });
    }
  };

module.exports = { getProviders, getProviderById };
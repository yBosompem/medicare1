const express = require('express');
const Provider = require('../models/Provider');

const router = express.Router();

// Get all providers
router.get('/', async (req, res) => {
  try {
    const providers = await Provider.find().populate('userId', 'firstName lastName');
    res.json(providers);
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong' });
  }
});

// Get a specific provider by ID
router.get('/:id', async (req, res) => {
    try {
      const provider = await Provider.findById(req.params.id).populate('userId', 'firstName lastName');
      if (!provider) {
        return res.status(404).json({ message: 'Provider not found' });
      }
      res.json(provider);
    } catch (err) {
      res.status(500).json({ message: 'Something went wrong' });
    }
  });

module.exports = router;
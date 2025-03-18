const express = require('express');
const auth = require('../middleware/auth');
const Review = require('../models/Review');

const router = express.Router();

// Add a new review (protected route)
router.post('/', auth, async (req, res) => {
  const { providerId, rating, reviewText } = req.body;

  try {
    const review = new Review({
      patientId: req.userId, // Get the user ID from the request object
      providerId,
      rating,
      reviewText,
    });

    await review.save();
    res.status(201).json(review);
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong' });
  }
});


// Get all reviews for a specific provider
router.get('/provider/:providerId', async (req, res) => {
  try {
    const reviews = await Review.find({ providerId: req.params.providerId })
      .populate('patientId', 'firstName lastName');
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong' });
  }
});

// Get a specific review by ID
router.get('/:id', async (req, res) => {
  try {
    const review = await Review.findById(req.params.id)
      .populate('patientId', 'firstName lastName')
      .populate('providerId', 'speciality location');
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }
    res.json(review);
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong' });
  }
});

module.exports = router;
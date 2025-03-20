// src/controllers/reviewController.js
const Review = require('../models/Review');

const addReview = async (req, res) => {
  const { providerId, rating, reviewText } = req.body;
  try {
    const review = new Review({
      patientId: req.userId, // obtained from the auth middleware
      providerId,
      rating,
      reviewText,
    });
    await review.save();
    res.status(201).json(review);
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

const getReviewsByProvider = async (req, res) => {
  try {
    const reviews = await Review.find({ providerId: req.params.providerId })
      .populate('patientId', 'firstName lastName');
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

const getReviewById = async (req, res) => {
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
};


module.exports = { addReview ,getReviewsByProvider, getReviewById };
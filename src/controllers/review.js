const Review = require('../models/Review');

// Add a new review
const addReview = async (req, res) => {
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
};

module.exports = { addReview };
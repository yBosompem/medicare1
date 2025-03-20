// src/routes/reviewRoutes.js
const express = require('express');
const auth = require('../middleware/auth');
const { addReview, getReviewsByProvider, getReviewById } = require('../controllers/review');

const router = express.Router();

// Add a new review (protected route)
router.post('/', auth, addReview);

// Get all reviews for a specific provider
router.get('/provider/:providerId', getReviewsByProvider);

// Get a specific review by ID
router.get('/:id', getReviewById);

module.exports = router;

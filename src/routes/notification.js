const express = require('express');
const { sendNotification, getNotifications } = require('../controllers/notification');
const auth = require('../middleware/auth'); // Authentication middleware

const router = express.Router();

// Send a notification (protected route)
router.post('/', auth, sendNotification);

// Get all notifications for the logged-in user (protected route)
router.get('/', auth, getNotifications);

module.exports = router;
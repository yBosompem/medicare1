const Notification = require('../models/Notification');

// Send a notification
const sendNotification = async (req, res) => {
  const { userId, message } = req.body;

  // Validate input
  if (!userId || !message) {
    return res.status(400).json({ message: 'userId and message are required' });
  }

  try {
    const notification = new Notification({ userId, message });
    await notification.save();
    res.status(201).json(notification);
  } catch (err) {
    console.error('Error sending notification:', err);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

// Get all notifications for the logged-in user
const getNotifications = async (req, res) => {
  try {
    // Fetch notifications for the logged-in user (userId is obtained from the auth middleware)
    const notifications = await Notification.find({ userId: req.userId }).sort({ createdAt: -1 }); // Sort by latest first
    res.json(notifications);
  } catch (err) {
    console.error('Error fetching notifications:', err);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

module.exports = { sendNotification, getNotifications };
const jwt = require('jsonwebtoken');
const { secret } = require('../config/jwt');

const auth = (req, res, next) => {
  // Get the token from the request header
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, secret);
    req.userId = decoded.userId; // Add the user ID to the request object
    next();
  } catch (err) {
    res.status(400).json({ message: 'Invalid token.' });
  }
};

module.exports = auth;
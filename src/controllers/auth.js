const bcrypt = require('bcryptjs');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const { secret, expiresIn } = require('../config/jwt');

// Register a new user
const register = async (req, res) => {
  const { email, password, firstName, lastName } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create a new user
    const user = new User({ email, password, firstName, lastName });
    await user.save();

    // Generate JWT token using the saved user's id
    const token = jwt.sign({ userId: user._id }, secret, { expiresIn });
    res.status(201).json({
      token,
        user: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
      },
     });
  } catch (err) {
    res.status(500).json({ message: `Something went wrong ${err}` });
  }
};

// Login a user
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token using the found user's id
    const token = jwt.sign({ userId: user._id }, secret, { expiresIn });
    res.json({
      token,
          user: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
      },

     });

  } catch (err) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

module.exports = { register, login };

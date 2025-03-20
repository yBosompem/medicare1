const express = require('express');
const auth = require('../middleware/auth');
const { createAppointment, getAppointments, getAppointmentById } = require('../controllers/appointment');

const router = express.Router();

// Create a new appointment (protected route)
router.post('/', auth, createAppointment);

// Get all appointments for the logged-in user (protected route)
router.get('/', auth, getAppointments);

// Get a specific appointment by ID (protected route)
router.get('/:id', auth, getAppointmentById);

module.exports = router;
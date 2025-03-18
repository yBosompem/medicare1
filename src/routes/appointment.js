const express = require('express');
const auth = require('../middleware/auth');
const Appointment = require('../models/Appointment');

const router = express.Router();

// Create a new appointment (protected route)
router.post('/', auth, async (req, res) => {
  const { providerId, appointmentDate, condition } = req.body;

  try {
    const appointment = new Appointment({
      patientId: req.userId, // Get the user ID from the request object
      providerId,
      appointmentDate,
      condition,
    });

    await appointment.save();
    res.status(201).json(appointment);
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong' });
  }
});

// Get all appointments for the logged-in user
router.get('/', auth, async (req, res) => {
  try {
    const appointments = await Appointment.find({ patientId: req.userId })
      .populate('providerId', 'speciality location')
      .populate('patientId', 'firstName lastName');
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong' });
  }
});

// Get a specific appointment by ID
router.get('/:id', auth, async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id)
      .populate('providerId', 'speciality location')
      .populate('patientId', 'firstName lastName');
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }
    res.json(appointment);
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong' });
  }
});


module.exports = router;
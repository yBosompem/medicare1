const Appointment = require('../models/Appointment');

// Create a new appointment
const createAppointment = async (req, res) => {
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
};

// Get all appointments for the logged-in user
const getAppointments = async (req, res) => {
  console.log('Request received:', req.method, req.url); // Log the request
  console.log('User ID:', req.userId); // Log the user ID from the token

  try {
    const appointments = await Appointment.find({ patientId: req.userId })
      .populate('providerId', 'firstName lastName speciality location')
      .populate('patientId', 'firstName lastName');
    res.json(appointments);
  } catch (err) {
    console.error('Error:', err); // Log the error
    res.status(500).json({ message: 'Something went wrong' });
  }
};

// Get a specific appointment by ID
const getAppointmentById = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id)
      .populate('providerId', 'firstName lastName speciality location')
      .populate('patientId', 'firstName lastName');
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }
    res.json(appointment);
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

module.exports = { createAppointment, getAppointments, getAppointmentById };
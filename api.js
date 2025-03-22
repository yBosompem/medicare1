import axios from 'axios';

// Base URL for the backend API
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Auth Routes
const register = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/auth/register`, userData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

const login = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, credentials);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Appointment Routes
const createAppointment = async (appointmentData, token) => {
  try {
    const response = await axios.post(`${API_URL}/appointments`, appointmentData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

const getAppointments = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/appointments`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

const getAppointmentById = async (id, token) => {
  try {
    const response = await axios.get(`${API_URL}/appointments/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Provider Routes
const getProviders = async () => {
  try {
    const response = await axios.get(`${API_URL}/providers`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

const getProviderById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/providers/${id}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Review Routes
const addReview = async (reviewData, token) => {
  try {
    const response = await axios.post(`${API_URL}/reviews`, reviewData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

const getReviewsByProvider = async (providerId) => {
  try {
    const response = await axios.get(`${API_URL}/reviews/provider/${providerId}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

const getReviewById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/reviews/${id}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Test Route
const testApi = async () => {
  try {
    const response = await axios.get(`${API_URL}/test`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Notification Routes
const sendNotification = async (userId, message, token) => {
    try {
      const response = await axios.post(
        `${API_URL}/notifications`,
        { userId, message },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  };
  
  const fetchNotifications = async (token) => {
    try {
      const response = await axios.get(`${API_URL}/notifications`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  };
  

export default {
  register,
  login,
  createAppointment,
  getAppointments,
  getAppointmentById,
  getProviders,
  getProviderById,
  addReview,
  getReviewsByProvider,
  getReviewById,
  testApi,
  sendNotification,
  fetchNotifications,
};
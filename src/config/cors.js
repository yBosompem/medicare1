const cors = require('cors');

const corsOptions = {
  origin: process.env.CORS_ORIGIN || '*',
  methods: process.env.CORS_METHODS || 'GET,POST,PUT,DELETE',
  allowedHeaders: process.env.CORS_ALLOWED_HEADERS || 'Content-Type,Authorization',
};

module.exports = cors(corsOptions);
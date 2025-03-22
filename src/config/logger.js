const morgan = require('morgan');

const logger = morgan(process.env.LOGGING_FORMAT || 'dev');

module.exports = logger;
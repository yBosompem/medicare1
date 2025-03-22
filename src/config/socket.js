module.exports = {
    cors: {
      origin: process.env.SOCKET_ORIGIN || '*',
      methods: process.env.SOCKET_METHODS || 'GET,POST',
    },
  };
// socketHandlers.js
const Chat = require('./models/chat');

module.exports = (io) => {
  // Socket.IO authentication
  io.use((socket, next) => {
    const token = socket.handshake.auth.token;
    if (!token) {
      return next(new Error('Authentication error: No token provided'));
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return next(new Error('Authentication error: Invalid token'));
      }
      socket.userId = decoded.userId; // Attach the user ID to the socket
      next();
    });
  });

  // Socket.IO connection
  io.on('connection', (socket) => {
    console.log('A user connected:', socket.id, 'User ID:', socket.userId);

    // Join a room for private messaging
    socket.on('joinRoom', (roomId) => {
      socket.join(roomId);
      console.log(`User ${socket.userId} joined room ${roomId}`);
    });

    // Handle chat messages
    socket.on('sendMessage', async (message) => {
      console.log('Message received:', message);

      try {
        // Save the message to the database
        const chat = new Chat({
          senderId: socket.userId,
          receiverId: message.receiverId,
          message: message.text,
        });
        await chat.save();

        // Emit the message only to the specific room
        io.to(message.roomId).emit('receiveMessage', { userId: socket.userId, message: message.text });
      } catch (err) {
        console.error('Error saving message:', err);
        socket.emit('error', 'Failed to send message');
      }
    });

    // Handle user disconnect
    socket.on('disconnect', () => {
      console.log('A user disconnected:', socket.id);
    });
  });
};
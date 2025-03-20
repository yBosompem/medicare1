const Chat = require('../models/chat');

const sendMessage = async (req, res) => {
  const { receiverId, message } = req.body;
  try {
    const chat = new Chat({
      senderId: req.userId,
      receiverId,
      message,
    });
    await chat.save();
    res.status(201).json(chat);
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

const getChatHistory = async (req, res) => {
  const { receiverId } = req.params;
  try {
    const chats = await Chat.find({
      $or: [
        { senderId: req.userId, receiverId },
        { senderId: receiverId, receiverId: req.userId },
      ],
    }).sort('timestamp');
    res.json(chats);
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

module.exports = { sendMessage, getChatHistory };
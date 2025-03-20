const AIChat = require('../models/AIChat');
const { OpenAI } = require('openai');

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const chatWithAI = async (req, res) => {
  const { message } = req.body;
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'user', content: message }],
    });
    const aiResponse = response.choices[0].message.content;

    const aiChat = new AIChat({
      userId: req.userId,
      message,
      response: aiResponse,
    });
    await aiChat.save();

    res.json({ response: aiResponse });
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

module.exports = { chatWithAI };
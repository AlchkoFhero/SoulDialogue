require('dotenv').config();
const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const cors = require('cors');
const rateLimit = require('express-rate-limit');

const app = express();
const PORT = process.env.PORT || 3001;

// CORS Configuration
app.use(cors({
 origin: ['http://localhost:3000', 'http://46.202.156.157', 'https://souldialogue.top', 'www.souldialogue.top', 'https://souldialogue.netlify.app' ], 
  methods: ['POST'],
  allowedHeaders: ['Content-Type', 'x-api-key'],
}));
app.use(bodyParser.json());

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: { success: false, message: 'Too many requests. Please try again later.' },
});
app.use(limiter);

// API Key Validation
app.use((req, res, next) => {
  console.log('Received API Key:', req.headers['x-api-key']);
  console.log('Expected API Key:', process.env.API_KEY);

  const apiKey = req.headers['x-api-key'];
  if (apiKey !== process.env.API_KEY) {
    console.error('Invalid API Key provided:', apiKey);
    return res.status(401).json({ success: false, message: 'Invalid API key' });
  }
  next();
});

const TELEGRAM_API = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`;
const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

// Telegram Message Route
app.post('/send-to-telegram', async (req, res) => {
  console.log('Received request body:', req.body);

  const { name, phone, message } = req.body;

  if (!name || !phone || !message) {
    console.error('Missing fields in request:', { name, phone, message });
    return res.status(400).json({
      success: false,
      message: 'All fields are required: name, phone, message.',
    });
  }

  // Russian Text for Telegram Message
  const text = `
    📝 *Новая заявка с сайта*\n
    👤 *Имя:* ${name}
    📞 *Телефон:* ${phone}
    ✉️ *Сообщение:* ${message}
  `;

  try {
    console.log(`Sending message to Telegram: ${text}`);
    const response = await axios.post(TELEGRAM_API, {
      chat_id: CHAT_ID,
      text,
      parse_mode: 'Markdown',
    });

    console.log('Telegram API response:', response.data);
    res.status(200).json({
      success: true,
      message: 'Message successfully sent to Telegram!',
    });
  } catch (error) {
    console.error('Error sending message to Telegram:', error.response?.data || error.message);
    res.status(500).json({
      success: false,
      message: 'Error sending message. Please try again later.',
    });
  }
});

// Temporary Debugging Route
app.get('/ping', (req, res) => {
  res.status(200).json({ success: true, message: 'Server is working!' });
});

// Catch-all error handler for unexpected issues
app.use((err, req, res, next) => {
  console.error('Unexpected error:', err.message);
  res.status(500).json({
    success: false,
    message: 'An unexpected error occurred. Please try again later.',
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://0.0.0.0:${PORT}`);
});
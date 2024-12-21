require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3001;
const allowedOrigin = 'https://souldialogue.netlify.app';

app.use(cors({
  origin: allowedOrigin,
  credentials: true
}));
app.use(bodyParser.json());

const TELEGRAM_API = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`;
const CHAT_ID = process.env.TELEGRAM_CHAT_ID;
const apiKey = process.env.NEXT_PUBLIC_API_KEY;

app.post('/send-to-telegram', async (req, res) => {
  const apiKey = req.get('x-api-key');

  if (!apiKey) {
    console.log("No apiKey provided");
       return res.status(401).send({ message: 'No apiKey provided' });
   }
    console.log('apiKey:', apiKey);
    console.log('process.env.API_KEY:', process.env.API_KEY);

  if (apiKey !== API_KEY) {
    return res.status(401).send({ message: 'Unauthorized' });
  }
  
  const { name, phone, message } = req.body;

  const text = `
    📝 *Новая заявка с сайта*\n
    👤 *Имя:* ${name}
    📞 *Телефон:* ${phone}
    ✉️ *Сообщение:* ${message}
  `;

  try {
    await axios.post(TELEGRAM_API, {
      chat_id: CHAT_ID,
      text,
      parse_mode: 'Markdown',
    });
    res.status(200).json({ success: true, message: 'Сообщение отправлено в Telegram!' });
  } catch (error) {
    console.error('Ошибка отправки в Telegram:', error.message);
    res.status(500).json({ success: false, message: 'Ошибка отправки сообщения.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log("API Key from Env:", apiKey); // Add this for debugging
});

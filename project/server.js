require('dotenv').config();
const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());

const TELEGRAM_API = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`;
const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

app.post('/send-to-telegram', async (req, res) => {
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
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});

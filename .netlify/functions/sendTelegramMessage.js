// .netlify/functions/sendTelegramMessage.js

const fetch = require('node-fetch');

exports.handler = async (event) => {
    const { TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID } = process.env;

    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Environment variables not set' }),
        };
    }

    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: JSON.stringify({ error: 'Method Not Allowed' }),
        };
    }

    try {
        const { name, phone, message } = JSON.parse(event.body);

        const text = `
📝 Новая заявка с сайта

📆 ${new Date().toLocaleDateString('ru-RU')}
⏰ ${new Date().toLocaleTimeString('ru-RU').slice(0, 5)}

👤 Имя: ${name}
📞 Телефон: ${phone}
✉️ Сообщение: ${message}
    `;

        const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ chat_id: TELEGRAM_CHAT_ID, text }),
        });

        const data = await response.json();

        if (!data.ok) {
            throw new Error(data.description || 'Ошибка при отправке сообщения');
        }

        return {
            statusCode: 200,
            body: JSON.stringify({ ok: true, result: data.result }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message }),
        };
    }
};

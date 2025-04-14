// .netlify/functions/sendTelegramMessage.js

const fetch = require('node-fetch');

exports.handler = async (event) => {
    const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
    const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
        console.error("❌ Переменные окружения не заданы");
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Environment variables not set' }),
        };
    }

    let payload;
    try {
        payload = JSON.parse(event.body);
    } catch (err) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: 'Невалидный JSON в теле запроса' }),
        };
    }

    const { name, phone, message, hiddenField } = payload;

    // Проверка honeypot-поля
    if (hiddenField && hiddenField.trim() !== '') {
        console.warn("⚠️ Обнаружен бот (honeypot заполнен)");
        return {
            statusCode: 403,
            body: JSON.stringify({ error: 'Bot detection triggered' }),
        };
    }

    // Проверка обязательных полей
    if (!name || !phone || !message) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: 'Все поля обязательны' }),
        };
    }

    const now = new Date();
    const formatter = new Intl.DateTimeFormat('ru-RU', {
        timeZone: 'Europe/Moscow',
        hour: '2-digit', minute: '2-digit',
        day: '2-digit', month: '2-digit', year: 'numeric'
    });
    const [datePart, timePart] = formatter.formatToParts(now).reduce((acc, part) => {
        if (part.type === 'day') acc[0] = part.value;
        if (part.type === 'month') acc[1] = part.value;
        if (part.type === 'year') acc[2] = part.value;
        if (part.type === 'hour') acc[3] = part.value;
        if (part.type === 'minute') acc[4] = part.value;
        return acc;
    }, []);

    const date = `${datePart}.${formatter.formatToParts(now).find(p => p.type === 'month').value}.${formatter.formatToParts(now).find(p => p.type === 'year').value}`;
    const time = `${formatter.formatToParts(now).find(p => p.type === 'hour').value}:${formatter.formatToParts(now).find(p => p.type === 'minute').value}`;

    const text = `
📝 Новая заявка с сайта SoulDialogue

📆 ${date}
⏰ ${time}

👤 Имя: ${name}
📞 Телефон: ${phone}
✉️ Сообщение: ${message}`;

    const contactPayload = {
        chat_id: TELEGRAM_CHAT_ID,
        contact: {
            phone_number: phone,
            first_name: name,
        },
    };

    try {
        const telegramRes = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ chat_id: TELEGRAM_CHAT_ID, text }),
        });

        const contactRes = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendContact`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(contactPayload),
        });

        const result = await telegramRes.json();
        const contactResult = await contactRes.json();

        if (!result.ok || !contactResult.ok) {
            throw new Error('Ошибка при отправке в Telegram');
        }

        return {
            statusCode: 200,
            body: JSON.stringify({ ok: true }),
        };
    } catch (error) {
        console.error("🔥 Ошибка при отправке сообщения:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Ошибка при отправке сообщения в Telegram' }),
        };
    }
};

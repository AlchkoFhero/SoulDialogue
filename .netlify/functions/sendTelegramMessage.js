const fetch = require('node-fetch');

exports.handler = async (event) => {
    const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
    const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

    console.log('TELEGRAM_BOT_TOKEN:', TELEGRAM_BOT_TOKEN);
    console.log('TELEGRAM_CHAT_ID:', TELEGRAM_CHAT_ID);

    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: '❌ Переменные окружения не заданы' }),
        };
    }

    let data;
    try {
        data = JSON.parse(event.body);
        console.log('📦 Получены данные из формы:', data);
    } catch (err) {
        console.error('❌ Ошибка при разборе тела запроса:', err);
        return {
            statusCode: 400,
            body: JSON.stringify({ error: '❌ Неверный формат JSON' }),
        };
    }

    const { name, phone, message } = data;

    const text =
        `📝 Новая заявка с сайта\n\n` +
        `📆 ${new Date().toLocaleDateString('ru-RU')}\n` +
        `⏰ ${new Date().toLocaleTimeString('ru-RU').slice(0, 5)}\n\n` +
        `👤 Имя: ${name || 'не указано'}\n` +
        `📞 Телефон: ${phone || 'не указан'}\n` +
        `✉️ Сообщение: ${message || 'не указано'}`;

    try {
        const telegramRes = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: TELEGRAM_CHAT_ID,
                text,
            }),
        });

        const result = await telegramRes.json();
        console.log('✅ Ответ Telegram:', result);

        if (!result.ok) {
            throw new Error(result.description);
        }

        return {
            statusCode: 200,
            body: JSON.stringify({ ok: true, result }),
        };
    } catch (err) {
        console.error('🔥 Ошибка при отправке в Telegram:', err);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: err.message }),
        };
    }
};

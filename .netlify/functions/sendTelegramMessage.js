const https = require('https');

exports.handler = async function (event) {
    const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
    const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Не заданы переменные окружения' }),
        };
    }

    try {
        const { name, phone, message } = JSON.parse(event.body);

        // Московское время
        const moscowOffset = 3 * 60 * 60 * 1000;
        const now = new Date(Date.now() + moscowOffset);
        const date = now.toISOString().slice(0, 10).split('-').reverse().join('-');
        const time = now.toTimeString().slice(0, 5);

        // Основное текстовое сообщение
        const text = `
📝 Новая заявка с сайта souldialogue.netlify.app
🌟 LEAD

👤 Имя: ${name}
📞 Телефон: ${phone}
✉️ Сообщение: 

${message}

📆 ${new Date().toLocaleDateString('ru-RU')}
⏰ ${new Date().toLocaleTimeString('ru-RU')}
🌐 Источник: Website`.trim();

        // Отправка текстового сообщения
        await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: TELEGRAM_CHAT_ID,
                text,
                parse_mode: 'HTML',
                disable_web_page_preview: true,
            }),
        });

        // Отправка контакт-карточки
        await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendContact`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: TELEGRAM_CHAT_ID,
                phone_number: phone.replace(/[^\d+]/g, ''),
                first_name: name,
                last_name: 'LEAD - 🌐',
            }),
        });

        return {
            statusCode: 200,
            body: JSON.stringify({ success: true }),
        };
    } catch (error) {
        console.error('🔥 Ошибка при отправке:', error.message);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message }),
        };
    }
};


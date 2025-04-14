export async function handler(event) {
    const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
    const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

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
            body: JSON.stringify({
                chat_id: TELEGRAM_CHAT_ID,
                text,
            }),
        });

        const data = await response.json();

        if (!data.ok) {
            throw new Error(data.description || 'Ошибка отправки');
        }

        return {
            statusCode: 200,
            body: JSON.stringify({ ok: true }),
        };
    } catch (err) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: err.message }),
        };
    }
}

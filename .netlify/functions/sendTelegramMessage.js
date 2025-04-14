export default async function handler(event) {
    const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
    const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

    console.log("TELEGRAM_BOT_TOKEN:", TELEGRAM_BOT_TOKEN);
    console.log("TELEGRAM_CHAT_ID:", TELEGRAM_CHAT_ID);

    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'TELEGRAM variables not defined' }),
        };
    }

    const { name, phone, message } = JSON.parse(event.body || '{}');
    console.log("📦 Получены данные из формы:", { name, phone, message });

    const text = `
  📝 Новая заявка с сайта
  
  📆 ${new Date().toLocaleDateString('ru-RU')}
  ⏰ ${new Date().toLocaleTimeString('ru-RU').slice(0, 5)}
  
  👤 Имя: ${name}
  📞 Телефон: ${phone}
  ✉️ Сообщение: ${message}
    `;

    try {
        const res = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: TELEGRAM_CHAT_ID,
                text,
            }),
        });

        const data = await res.json();
        console.log("✅ Ответ Telegram:", data);

        if (!data.ok) {
            throw new Error(data.description || 'Unknown Telegram error');
        }

        return {
            statusCode: 200,
            body: JSON.stringify({ ok: true }),
        };
    } catch (err) {
        console.error("🔥 Ошибка при выполнении:", err.message);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: err.message || 'Internal error' }),
        };
    }
}

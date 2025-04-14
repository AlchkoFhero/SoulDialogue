export async function handler(event) {
    const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
    const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
        console.error("❌ Ошибка: переменные окружения не заданы");
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Переменные окружения не заданы" }),
        };
    }

    let name = "";
    let phone = "";
    let message = "";

    try {
        const body = JSON.parse(event.body);
        name = body.name || "";
        phone = body.phone || "";
        message = body.message || "";
    } catch (err) {
        console.error("❌ Ошибка парсинга тела запроса", err);
        return {
            statusCode: 400,
            body: JSON.stringify({ error: "Неверный формат запроса" }),
        };
    }

    const text = `
  📝 Новая заявка с сайта SoulDialogue
  
  📆 ${new Date().toLocaleDateString("ru-RU")}
  ⏰ ${new Date().toLocaleTimeString("ru-RU").slice(0, 5)}
  
  👤 Имя: ${name}
  📞 Телефон: ${phone}
  ✉️ Сообщение: ${message}
    `;

    try {
        const telegramRes = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                chat_id: TELEGRAM_CHAT_ID,
                text,
            }),
        });

        const result = await telegramRes.json();

        if (!telegramRes.ok) {
            console.error("❌ Ошибка при отправке в Telegram:", result);
            return {
                statusCode: telegramRes.status,
                body: JSON.stringify({ error: "Не удалось отправить сообщение", details: result }),
            };
        }

        return {
            statusCode: 200,
            body: JSON.stringify({ ok: true, result }),
        };
    } catch (error) {
        console.error("❌ Сбой при отправке в Telegram:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Ошибка отправки", details: error.message }),
        };
    }
}

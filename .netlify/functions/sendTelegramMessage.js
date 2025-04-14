import fetch from 'node-fetch';

export const handler = async (event) => {
    const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
    const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
        return new Response(JSON.stringify({ error: 'Missing environment variables' }), { status: 500 });
    }

    let data;

    try {
        data = JSON.parse(event.body);
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Invalid JSON' }), { status: 400 });
    }

    const { name, phone, message } = data;

    const formattedDate = new Date().toLocaleDateString('ru-RU').split('.').reverse().join('-');
    const formattedTime = new Date().toLocaleTimeString('ru-RU').slice(0, 5);

    const text = `
📝 Новая заявка с сайта https://souldialogue.netlify.app

📅 ${formattedDate}
⏰ ${formattedTime}

👤 Имя: ${name}
📞 Телефон: ${phone}
✉️ Сообщение: ${message}
  `;

    try {
        // Отправляем текстовое сообщение
        const sendMessageRes = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: TELEGRAM_CHAT_ID,
                text,
                parse_mode: 'HTML'
            })
        });

        const sendMessageResult = await sendMessageRes.json();

        // Отправляем контакт
        const sendContactRes = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendContact`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: TELEGRAM_CHAT_ID,
                phone_number: phone.replace(/[^+\d]/g, ''),
                first_name: name
            })
        });

        const sendContactResult = await sendContactRes.json();

        return new Response(JSON.stringify({
            ok: true,
            message_result: sendMessageResult,
            contact_result: sendContactResult
        }), { status: 200 });
    } catch (error) {
        console.error('🔥 Ошибка при отправке:', error);
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
};

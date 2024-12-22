
import React, { useState } from 'react';
import { Phone, Mail, MapPin, MessageCircle } from 'lucide-react';

const messages = {
  success: 'Сообщение успешно отправлено!',
  honeypot: 'Ошибка. Форма не отправлена.',
  validationError: 'Пожалуйста, заполните все поля.',
  serverError: 'Ошибка сервера. Попробуйте позже.',
};

function checkHoneypot() {
  const honeypotField = document.querySelector('input[name="honeypot"]');
  return honeypotField?.value;
}

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    message: '',
  });
  const [responseMessage, setResponseMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setResponseMessage('');

    // Honeypot check
    if (checkHoneypot()) {
      console.log('Спам-бот попытался отправить форму.');
      setResponseMessage(messages.honeypot);
      return;
    }

    if (!formData.name.trim() || !formData.phone.trim() || !formData.message.trim()) {
      setResponseMessage(messages.validationError);
      return;
    }

    setLoading(true);

    try {
      const TELEGRAM_BOT_TOKEN = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
      const TELEGRAM_CHAT_ID = import.meta.env.VITE_TELEGRAM_CHAT_ID;

      if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
        console.error('Ошибка: Переменные окружения для Telegram не настроены.');
        setResponseMessage(messages.serverError);
        return;
      }

      const message = `
📝 Новая заявка с сайта souldialogue.netlify.app

📆 ${new Date().toLocaleDateString()}
⏰ ${new Date().toLocaleTimeString()}

👤 Имя: ${formData.name}
📞 Телефон: ${formData.phone}
✉️ Сообщение: ${formData.message}
      `;

      const response = await fetch(
        `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            chat_id: TELEGRAM_CHAT_ID,
            text: message,
          }),
        }
      );

      if (!response.ok) {
        const error = await response.json();
        console.error('Ошибка отправки:', error.description || 'Неизвестная ошибка.');
        setResponseMessage(`Ошибка: ${error.description || messages.serverError}`);
        return;
      }

      setResponseMessage(messages.success);
      setFormData({ name: '', phone: '', message: '' });
    } catch (error) {
      console.error('Ошибка отправки:', error.message || error);
      setResponseMessage(`Ошибка: ${error.message || messages.serverError}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-16 bg-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Свяжитесь с нами
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-600">
            Мы всегда рады ответить на ваши вопросы
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">Наши контакты</h3>
            <div className="space-y-6">
              <div className="flex items-center">
                <Phone className="w-6 h-6 text-purple-600" />
                <a href="tel:+79179351851" className="ml-4 text-gray-600 hover:text-purple-600">
                  +7 (917) 935-18-51
                </a>
              </div>
              <div className="flex items-center">
                <MessageCircle className="w-6 h-6 text-purple-600" />
                <div className="ml-4 space-x-4">
                  <a
                    href="https://api.whatsapp.com/send?phone=79179351851"
                    className="text-gray-600 hover:text-purple-600"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    WhatsApp
                  </a>
                  <a
                    href="https://t.me/Valentina_mas5"
                    className="text-gray-600 hover:text-purple-600"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Telegram
                  </a>
                </div>
              </div>
              <div className="flex items-center">
                <Mail className="w-6 h-6 text-purple-600" />
                <a href="mailto:contact@dialog-dushi.ru" className="ml-4 text-gray-600 hover:text-purple-600">
                  contact@dialog-dushi.ru
                </a>
              </div>
              <div className="flex items-start">
                <MapPin className="w-6 h-6 text-purple-600" />
                <span className="ml-4 text-gray-600">
                  г. Альметьевск, ул. Ленина, д. 52
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">Напишите нам</h3>
            <form className="space-y-6" onSubmit={handleSubmit} data-netlify="true">
              <input type="hidden" name="form-name" value="contact" />
              <div style={{ display: 'none' }}>
                <label>
                  Не заполняйте это поле:
                  <input type="text" name="honeypot" />
                </label>
              </div>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Ваше имя
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                  Телефон
                </label>
                <input
                  type="tel"
                  id="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                  Сообщение
                </label>
                <textarea
                  id="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-purple-600 text-white rounded-md py-2 px-4 hover:bg-purple-700 transition-colors"
                disabled={loading}
              >
                {loading ? 'Отправка...' : 'Отправить'}
              </button>
            </form>
            {responseMessage && (
              <p className="mt-4 text-center text-sm text-gray-600">{responseMessage}</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
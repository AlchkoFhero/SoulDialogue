import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Phone, MapPin, MessageCircle } from 'lucide-react';

export function Contact() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true, // Избегаем повторных анимаций
      mirror: false, // Убираем анимацию при скролле назад
    });
  }, []);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    message: '',
  });
  const [responseMessage, setResponseMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    if (id === 'phone') {
      const cleaned = value.replace(/[^\d+() -]/g, '');
      setFormData((prev) => ({ ...prev, phone: cleaned }));
    } else {
      setFormData((prev) => ({ ...prev, [id]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setResponseMessage('');

    if (!formData.name.trim() || !formData.phone.trim() || !formData.message.trim()) {
      setResponseMessage('Пожалуйста, заполните все поля.');
      return;
    }

    setLoading(true);

    try {
      const TELEGRAM_BOT_TOKEN = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
      const TELEGRAM_CHAT_ID = import.meta.env.VITE_TELEGRAM_CHAT_ID;

      if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
        console.error('Ошибка: Переменные окружения для Telegram не настроены.');
        setResponseMessage('Ошибка сервера. Попробуйте позже.');
        return;
      }

      const cleanPhoneNumber = '+' + formData.phone.replace(/\D/g, '');

      const message = `
📝 Новая заявка с сайта souldialogue.netlify.app

📆 ${new Date().toLocaleDateString('ru-RU').split('.').join('-')}
⏰ ${new Date().toLocaleTimeString('ru-RU').slice(0, 5)}

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
        throw new Error('Ошибка отправки сообщения');
      }

      setResponseMessage('Сообщение успешно отправлено!');
      setFormData({ name: '', phone: '', message: '' });
    } catch (error) {
      console.error('Ошибка отправки:', error.message || error);
      setResponseMessage('Ошибка сервера. Попробуйте позже.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-purple-50 pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12" data-aos="fade-up">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Контакты</h1>
          <p className="text-xl text-gray-600" data-aos="fade-up" data-aos-delay="100">
            Свяжитесь с нами удобным для вас способом
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div className="bg-white rounded-lg shadow-lg p-8" data-aos="fade-right" data-aos-delay="200">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Наши контакты</h2>
            <div className="space-y-4">
              <a
                href="https://api.whatsapp.com/send?phone=79179351851"
                className="flex items-center px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="w-6 h-6 mr-3" /> WhatsApp
              </a>
              <a
                href="https://t.me/Valentina_mas5"
                className="flex items-center px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="w-6 h-6 mr-3" /> Telegram
              </a>
              <div className="flex items-start">
                <MapPin className="w-6 h-6 text-purple-600" />
                <div className="ml-4">
                  <p className="text-gray-600">г. Альметьевск, ул. Ленина, д. 52</p>
                  <p className="text-gray-500 text-sm">Режим работы: Пн-Пт 9:00-20:00, Сб 10:00-18:00</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8" data-aos="fade-left" data-aos-delay="200">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Напишите нам</h2>
            <form className="space-y-6" onSubmit={handleSubmit}>
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

        <div
          className="bg-white rounded-lg shadow-lg p-8 mb-16"
          data-aos="fade-up"
          data-aos-delay="300"
        >
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Как нас найти</h2>
          <div className="aspect-w-16 aspect-h-9">
            <iframe
              src="https://yandex.ru/map-widget/v1/?um=constructor%3Add690dd52bbe3d3d5274709c0a162d4c92ea93a886cb4f42ee0868cac94ebf43&amp;source=constructor"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              className="rounded-lg"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}

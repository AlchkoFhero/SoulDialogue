import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import axios from 'axios';
import { Phone, Mail, MapPin, MessageCircle } from 'lucide-react';

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    message: '',
  });
  const [responseMessage, setResponseMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: false,
      mirror: true,
    });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const validateForm = () => {
    const { name, phone, message } = formData;
    if (!name.trim() || !phone.trim() || !message.trim()) {
      setResponseMessage('Пожалуйста, заполните все поля.');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setResponseMessage('');
    if (!validateForm()) return;

    setLoading(true);

    try {
      const response = await axios.post('https://souldialogue.top:3001/send-to-telegram', formData, { 
        headers: { 
          'Content-Type': 'application/json', 
          'x-api-key': process.env.API_KEY, 
        }, 
        withCredentials: true, 
      });
      
      if (response.data && response.data.success) {
        setResponseMessage(response.data.message || 'Сообщение успешно отправлено!');
        setFormData({ name: '', phone: '', message: '' });
      } else {
        console.error('Ошибка сервера:', response.data.message);
        setResponseMessage(response.data.message || 'Ошибка сервера. Попробуйте ещё раз.');
      }
    } catch (error) {
      if (error.response) {
        console.error('Ошибка ответа от сервера:', error.response.data);
        setResponseMessage(`Ошибка сервера: ${error.response.data.message || 'Неизвестная ошибка'}`);
      } else if (error.request) {
        console.error('Ошибка запроса:', error.request);
        setResponseMessage('Ошибка сети. Проверьте подключение.');
      } else {
        console.error('Ошибка:', error.message);
        setResponseMessage('Произошла ошибка. Попробуйте позже.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-purple-50 pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Заголовок */}
        <div className="text-center mb-12" data-aos="fade-up">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Контакты</h1>
          <p className="text-xl text-gray-600" data-aos="fade-up" data-aos-delay="100">
            Свяжитесь с нами удобным для вас способом
          </p>
        </div>

        {/* Контактные данные и форма */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Контакты */}
          <div
            className="bg-white rounded-lg shadow-lg p-8"
            data-aos="fade-right"
            data-aos-delay="200"
          >
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Наши контакты</h2>
            <div className="space-y-6">
              <div className="flex items-center">
                <Phone className="w-6 h-6 text-purple-600" />
                <a
                  href="tel:+79179351851"
                  className="ml-4 text-gray-600 hover:text-purple-600"
                >
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
                <a
                  href="mailto:contact@dialog-dushi.ru"
                  className="ml-4 text-gray-600 hover:text-purple-600"
                >
                  contact@dialog-dushi.ru
                </a>
              </div>
              <div className="flex items-start">
                <MapPin className="w-6 h-6 text-purple-600" />
                <div className="ml-4">
                  <span className="text-gray-600 block">
                    г. Альметьевск, ул. Ленина, д. 52
                  </span>
                  <span className="text-gray-500 text-sm block mt-1">
                    Режим работы: Пн-Пт 9:00-20:00, Сб 10:00-18:00
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Форма */}
          <div
            className="bg-white rounded-lg shadow-lg p-8"
            data-aos="fade-left"
            data-aos-delay="200"
          >
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
      </div>
    </div>
  );
}

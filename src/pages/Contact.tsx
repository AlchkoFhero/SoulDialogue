import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Phone, Mail, MapPin, MessageCircle } from 'lucide-react';

export function Contact() {
  useEffect(() => {
    AOS.init({
      duration: 800, // Длительность анимации
      easing: 'ease-in-out', // Плавность анимации
      once: false, // Анимация запускается каждый раз
      mirror: true, // Анимация срабатывает при прокрутке вверх
    });
  }, []);

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
                    г. Казань, ул. Пушкина, д. 52
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
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Ваше имя
                </label>
                <input
                  type="text"
                  id="name"
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
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700"
                >
                  Сообщение
                </label>
                <textarea
                  id="message"
                  rows={4}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-purple-600 text-white rounded-md py-2 px-4 hover:bg-purple-700 transition-colors"
              >
                Отправить
              </button>
            </form>
          </div>
        </div>

        {/* Карта */}
        <div
          className="bg-white rounded-lg shadow-lg p-8 mb-16"
          data-aos="fade-up"
          data-aos-delay="300"
        >
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Как нас найти</h2>
          <div className="aspect-w-16 aspect-h-9">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2243.0350850565584!2d49.12242631593!3d55.786774980557!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x415ead0f1ad68f4d%3A0x2d2d8b9ee6d2e1e2!2z0YPQuy4g0J_Rg9GI0LrQuNC90LAsIDUyLCDQmtCw0LfQsNC90YwsINCg0LXRgdC_LiDQotCw0YLQsNGA0YHRgtCw0L0sIDQyMDEwMw!5e0!3m2!1sru!2sru!4v1645789012345!5m2!1sru!2sru"
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

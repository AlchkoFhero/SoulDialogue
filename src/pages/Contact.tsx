import React, { useEffect, useState, useLayoutEffect, useRef } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Phone, MapPin, MessageCircle, Clock } from 'lucide-react';

export function Contact() {
  const contentRef = useRef(null);
  const [layoutShift, setLayoutShift] = useState(0);

  useEffect(() => {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false,
    });
    AOS.refresh();
  }, []);

  useLayoutEffect(() => {
    if (contentRef.current) {
      const contentBox = contentRef.current.getBoundingClientRect();
      const initialHeight = contentBox.height;

      window.requestAnimationFrame(() => {
        if (contentRef.current) {
          const newContentBox = contentRef.current.getBoundingClientRect();
          const newHeight = newContentBox.height;
          setLayoutShift(newHeight - initialHeight);
        }
      });
    }
  }, [layoutShift]);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    message: '',
  });

  const [responseMessage, setResponseMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    if (id === 'phone') {
      const cleaned = value.replace(/[^
  \d + () -]/g, '');
  setFormData((prev) => ({ ...prev, phone: cleaned }));
} else {
  setFormData((prev) => ({ ...prev, [id]: value }));
}
  };

const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setResponseMessage('');

  // ⛔ Honeypot field
  const form = e.target as HTMLFormElement;
  if ((form as any)?.website?.value) {
    console.warn('Бот пойман на honeypot');
    return;
  }

  // 🛡️ Простая защита от частого спама (в браузере)
  const lastSent = localStorage.getItem('lastSent');
  const now = Date.now();
  if (lastSent && now - parseInt(lastSent) < 30000) {
    setResponseMessage('Подождите немного перед повторной отправкой.');
    return;
  }

  if (!formData.name.trim() || !formData.phone.trim() || !formData.message.trim()) {
    setResponseMessage('Пожалуйста, заполните все поля.');
    return;
  }

  setLoading(true);

  try {
    const response = await fetch('/.netlify/functions/sendTelegramMessage', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (!response.ok || data.error) {
      throw new Error(data.error || 'Ошибка при отправке');
    }

    localStorage.setItem('lastSent', now.toString());
    setResponseMessage('Сообщение успешно отправлено!');
    setFormData({ name: '', phone: '', message: '' });
  } catch (error: any) {
    console.error('Ошибка отправки:', error.message || error);
    setResponseMessage('Ошибка сервера. Попробуйте позже.');
  } finally {
    setLoading(false);
  }
};

return (
  <div
    style={{ marginTop: layoutShift > 0 ? `-${layoutShift}px` : 0 }}
    className="bg-purple-50 pt-24 transition-all duration-300"
  >
    <div className="max-w-screen-md mx-auto px-4 sm:px-6 lg:px-8 py-10" ref={contentRef}>
      <div className="text-center mb-12" data-aos="fade-up">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Контакты</h1>
        <p className="text-xl text-gray-600" data-aos="fade-up" data-aos-delay="100">
          Свяжитесь с нами удобным для вас способом
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        <div className="bg-white rounded-lg shadow-lg p-8" data-aos="fade-right" data-aos-delay="200">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Наши контакты</h2>
          <div className="space-y-6">
            <div className="flex items-center">
              <Phone className="w-6 h-6 text-purple-600" />
              <a
                href="tel:+79179351851"
                className="ml-4 text-gray-700 hover:text-purple-600 text-lg font-medium"
              >
                +7 (917) 935-18-51
              </a>
            </div>
            <div className="flex space-x-2">
              <a
                href="https://api.whatsapp.com/send?phone=79179351851"
                className="flex items-center justify-center px-3 py-2 bg-gradient-to-r from-green-400 to-green-600 text-white rounded-full hover:from-green-500 hover:to-green-700 transition-all transform hover:scale-105 shadow-sm w-full"
                target="_blank"
                rel="noopener noreferrer"
                style={{ maxWidth: '140px' }}
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                <span className="text-sm font-medium whitespace-nowrap">WhatsApp</span>
              </a>
              <a
                href="https://t.me/Valentina_mas5"
                className="flex items-center justify-center px-3 py-2 bg-gradient-to-r from-blue-400 to-blue-600 text-white rounded-full hover:from-blue-500 hover:to-blue-700 transition-all transform hover:scale-105 shadow-sm w-full"
                target="_blank"
                rel="noopener noreferrer"
                style={{ maxWidth: '140px' }}
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                <span className="text-sm font-medium whitespace-nowrap">Telegram</span>
              </a>
            </div>
            <div className="flex items-start">
              <MapPin className="w-6 h-6 text-purple-600" />
              <div className="ml-4">
                <p className="text-gray-600 text-lg font-medium">
                  г. Альметьевск, ул. Мира, д. 2
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <Clock className="w-6 h-6 text-purple-600" />
              <div className="ml-4">
                <table className="text-gray-600 text-sm">
                  <tbody>
                    <tr><td className="pr-4 font-medium">Пн-Пт:</td><td>9:00–20:00</td></tr>
                    <tr><td className="pr-4 font-medium">Сб:</td><td>10:00–18:00</td></tr>
                    <tr><td className="pr-4 font-medium">Вс:</td><td>Выходной</td></tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8" data-aos="fade-left" data-aos-delay="200">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Напишите нам</h2>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <input type="text" name="website" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Ваше имя</label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Введите ваше имя"
                className="mt-1 block w-full rounded-md border-gray-200 shadow-sm focus:border-purple-500 focus:ring-purple-500 hover:border-purple-300 outline-none p-2"
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Телефон</label>
              <input
                type="tel"
                id="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Введите ваш телефон"
                className="mt-1 block w-full rounded-md border-gray-200 shadow-sm focus:border-purple-500 focus:ring-purple-500 hover:border-purple-300 outline-none p-2"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">Сообщение</label>
              <textarea
                id="message"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                placeholder="Напишите ваше сообщение"
                className="mt-1 block w-full rounded-md border-gray-200 shadow-sm focus:border-purple-500 focus:ring-purple-500 hover:border-purple-300 outline-none p-2"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-500 to-purple-700 text-white rounded-lg py-3 px-4 hover:from-purple-600 hover:to-purple-800 transition-all shadow-md font-semibold"
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

      <div className="bg-white rounded-lg shadow-lg p-8 mb-16" data-aos="fade-up" data-aos-delay="300">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Как нас найти</h2>
        <div className="aspect-w-16 aspect-h-9">
          <iframe
            src="https://yandex.ru/map-widget/v1/?um=constructor%3Add690dd52bbe3d3d5274709c0a162d4c92ea93a886cb4f42ee0868cac94ebf43&source=constructor"
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

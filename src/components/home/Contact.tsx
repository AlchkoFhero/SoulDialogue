import React, { useState } from 'react';
import { Phone, Mail, MapPin, MessageCircle } from 'lucide-react';

interface FormData {
  name: string;
  phone: string;
  message: string;
  website?: string;
}

interface FormErrors {
  name?: string;
  phone?: string;
  message?: string;
}

const initialFormData: FormData = {
  name: '',
  phone: '',
  message: '',
};

const formatPhoneNumber = (value: string): string => {
  const hasPlus = value.startsWith('+');
  let cleaned = value.replace(/\D/g, '');

  if (cleaned.length === 0) return '';

  if (cleaned.startsWith('8') || cleaned.startsWith('7')) {
    cleaned = cleaned.substring(1);
    return formatRussianNumber(cleaned);
  }

  if (hasPlus) {
    return `+${cleaned}`;
  }

  return cleaned;
};

const formatRussianNumber = (cleaned: string): string => {
  const parts = [];
  parts.push('+7');

  if (cleaned.length > 0) {
    parts.push(' (');
    parts.push(cleaned.substring(0, Math.min(3, cleaned.length)));
  }

  if (cleaned.length > 3) {
    parts.push(') ');
    parts.push(cleaned.substring(3, Math.min(6, cleaned.length)));
  }

  if (cleaned.length > 6) {
    parts.push('-');
    parts.push(cleaned.substring(6, Math.min(8, cleaned.length)));
  }

  if (cleaned.length > 8) {
    parts.push('-');
    parts.push(cleaned.substring(8, Math.min(10, cleaned.length)));
  }

  return parts.join('');
};

export function Contact() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<FormErrors>({});
  const [responseMessage, setResponseMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setErrors(prev => ({ ...prev, [id]: '' }));

    if (id === 'phone') {
      setFormData(prev => ({ ...prev, phone: formatPhoneNumber(value) }));
    } else {
      setFormData(prev => ({ ...prev, [id]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setResponseMessage('');

    const form = e.target as HTMLFormElement;
    if ((form as any)?.website?.value) {
      console.warn('Бот пойман на honeypot');
      return;
    }

    const lastSent = localStorage.getItem('lastSent');
    const now = Date.now();
    if (lastSent && now - parseInt(lastSent) < 30000) {
      setResponseMessage('Подождите немного перед повторной отправкой.');
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
      setFormData(initialFormData);
      setErrors({});
    } catch (error: any) {
      console.error('Ошибка отправки:', error.message || error);
      setResponseMessage('Ошибка сервера. Попробуйте позже.');
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
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                  <Phone className="w-5 h-5 text-purple-600" />
                </div>
                <a
                  href="tel:+79179351851"
                  className="ml-4 text-gray-700 hover:text-purple-600 transition-colors duration-300 text-base"
                >
                  +7 (917) 935-18-51
                </a>
              </div>

              <div className="flex space-x-4">
                <a
                  href="https://t.me/Valentina_mas5"
                  className="flex-1 flex items-center justify-center px-4 py-2.5 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg hover:from-purple-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-sm"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  <span className="text-sm font-medium">Telegram</span>
                </a>
                <a
                  href="https://api.whatsapp.com/send?phone=79179351851"
                  className="flex-1 flex items-center justify-center px-4 py-2.5 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg hover:from-purple-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-sm"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  <span className="text-sm font-medium">WhatsApp</span>
                </a>
              </div>

              <div className="flex items-start">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-purple-600" />
                </div>
                <div className="ml-4">
                  <p className="text-gray-700 text-base">г. Альметьевск, ул. Мира, д. 2, ТРЦ "Тандем"</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">Напишите нам</h3>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <input type="text" name="website" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />

              <div>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Ваше имя"
                  className={`w-full px-4 py-2.5 rounded-lg border ${errors.name ? 'border-red-500' : 'border-gray-200'
                    } focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300`}
                />
                {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
              </div>

              <div>
                <input
                  type="tel"
                  id="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Телефон"
                  className={`w-full px-4 py-2.5 rounded-lg border ${errors.phone ? 'border-red-500' : 'border-gray-200'
                    } focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300`}
                />
                {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone}</p>}
              </div>

              <div>
                <textarea
                  id="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Ваше сообщение"
                  className={`w-full px-4 py-2.5 rounded-lg border ${errors.message ? 'border-red-500' : 'border-gray-200'
                    } focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300`}
                />
                {errors.message && <p className="mt-1 text-sm text-red-500">{errors.message}</p>}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 px-4 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg hover:from-purple-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
              >
                {loading ? 'Отправка...' : 'Отправить сообщение'}
              </button>

              {responseMessage && (
                <p
                  className={`text-center text-sm ${responseMessage.includes('успешно') ? 'text-green-600' : 'text-red-500'
                    }`}
                >
                  {responseMessage}
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
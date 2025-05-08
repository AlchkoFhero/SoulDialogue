import React, { useEffect, useState, useLayoutEffect, useRef } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Phone, MapPin, Clock } from 'lucide-react';

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
  // Сохраняем плюс в начале, если он есть
  const hasPlus = value.startsWith('+');

  // Очищаем от всего кроме цифр
  let cleaned = value.replace(/\D/g, '');

  // Если номер пустой
  if (cleaned.length === 0) return '';

  // Обработка российских номеров
  if (cleaned.startsWith('8') || cleaned.startsWith('7')) {
    // Убираем 8 или 7 в начале и добавляем +7
    cleaned = cleaned.substring(1);
    return formatRussianNumber(cleaned);
  }

  // Если начинался с плюса - возвращаем его
  if (hasPlus) {
    return `+${cleaned}`;
  }

  return cleaned;
};

// Форматирование российского номера
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

const validateForm = (data: FormData): FormErrors => {
  const errors: FormErrors = {};

  if (!data.name.trim()) {
    errors.name = 'Пожалуйста, введите ваше имя';
  }

  if (!data.phone.trim()) {
    errors.phone = 'Пожалуйста, введите номер телефона';
  } else {
    const digits = data.phone.replace(/\D/g, '');
    // Для российских номеров проверяем длину 10 цифр (без кода страны)
    if (data.phone.includes('+7') || data.phone.startsWith('8')) {
      if (digits.length !== 11) {
        errors.phone = 'Введите корректный российский номер телефона';
      }
    } else {
      // Для международных номеров минимум 8 цифр
      if (digits.length < 8) {
        errors.phone = 'Номер телефона должен содержать минимум 8 цифр';
      }
    }
  }

  if (!data.message.trim()) {
    errors.message = 'Пожалуйста, введите сообщение';
  }

  return errors;
};

const TelegramIcon = () => (
  <svg
    className="w-5 h-5 mr-2"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
  </svg>
);

const WhatsAppIcon = () => (
  <svg
    className="w-5 h-5 mr-2"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
  </svg>
);

export function Contact() {
  const contentRef = useRef(null);
  const [layoutShift, setLayoutShift] = useState(0);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<FormErrors>({});
  const [responseMessage, setResponseMessage] = useState('');
  const [loading, setLoading] = useState(false);

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

    // Honeypot check
    const form = e.target as HTMLFormElement;
    if ((form as any)?.website?.value) {
      console.warn('Бот пойман на honeypот');
      return;
    }

    // Validation
    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Spam protection
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Секция контактов */}
          <div className="bg-white rounded-xl shadow-lg p-8" data-aos="fade-right" data-aos-delay="200">
            <div className="space-y-6">
              {/* Телефон */}
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

              {/* Мессенджеры */}
              <div className="space-y-4">
                <a
                  href="https://t.me/Valentina_mas5"
                  className="w-full flex items-center justify-center px-4 py-2.5 bg-gradient-to-r from-[#0072ac] to-[#00a0dc] text-white rounded-lg hover:from-[#005c8a] hover:to-[#0088cc] transition-all duration-300 transform hover:scale-105 shadow-sm"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <TelegramIcon />
                  <span className="text-sm font-medium">Telegram</span>
                </a>
                <a
                  href="https://api.whatsapp.com/send?phone=79179351851"
                  className="w-full flex items-center justify-center px-4 py-2.5 bg-gradient-to-r from-[#128C7E] to-[#25D366] text-white rounded-lg hover:from-[#0E735E] hover:to-[#1EA952] transition-all duration-300 transform hover:scale-105 shadow-sm"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <WhatsAppIcon />
                  <span className="text-sm font-medium">WhatsApp</span>
                </a>
              </div>

              {/* Address section */}
              <div className="flex items-center space-x-4"> {/* Added space-x-4 for consistent spacing */}
                <div className="flex-shrink-0 w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-purple-600" />
                </div>
                <a
                  href="https://yandex.ru/map-widget/v1/?um=constructor%3Add690dd52bbe3d3d5274709c0a162d4c92ea93a886cb4f42ee0868cac94ebf43&source=constructor"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-700 hover:text-purple-600 transition-colors duration-300 text-base"
                >
                  г. Альметьевск, ул. Мира, д. 2, ТРЦ "Тандем"
                </a>
              </div>

              {/* Режим работы */}
              <div className="flex items-start">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                  <Clock className="w-5 h-5 text-purple-600" />
                </div>
                <div className="ml-4 text-base">
                  <p className="text-gray-700">Пн-Вс: 7:00–20:00</p>
                  <p className="text-gray-500 mt-1">По предварительной записи</p>
                </div>
              </div>
            </div>
          </div>

          {/* Форма обратной связи */}
          <div className="bg-white rounded-xl shadow-lg p-8" data-aos="fade-left" data-aos-delay="200">
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
                <p className={`text-center text-sm ${responseMessage.includes('успешно') ? 'text-green-600' : 'text-red-500'
                  }`}>
                  {responseMessage}
                </p>
              )}
            </form>
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
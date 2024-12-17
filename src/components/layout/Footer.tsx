import React from 'react';
import { Phone, Mail, MapPin, Instagram } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
        {/* Контакты */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold mb-4 text-purple-400">Контакты</h3>
          <div className="flex items-center justify-center md:justify-start space-x-2">
            <Phone className="w-5 h-5 text-purple-400" />
            <span>+7 (917) 935-18-51</span>
          </div>
          <div className="flex items-center justify-center md:justify-start space-x-2">
            <Mail className="w-5 h-5 text-purple-400" />
            <span>contact@dialog-dushi.ru</span>
          </div>
          <div className="flex items-center justify-center md:justify-start space-x-2">
            <MapPin className="w-5 h-5 text-purple-400" />
            <span>г. Альметьевск, ул. Ленина, д. 52</span>
          </div>
        </div>

        {/* Социальные сети */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold mb-4 text-purple-400">Следите за нами</h3>
          <div className="flex justify-center md:justify-start space-x-6">
            <a
              href="https://instagram.com"
              className="text-gray-400 hover:text-purple-400 transition duration-200"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Instagram className="w-6 h-6" />
            </a>
            <a
              href="https://vk.com"
              className="text-gray-400 hover:text-purple-400 transition duration-200"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/vk.svg"
                alt="ВКонтакте"
                className="w-6 h-6"
              />
            </a>
          </div>
        </div>

        {/* Режим работы */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold mb-4 text-purple-400">Режим работы</h3>
          <p>Пн-Пт: 9:00 - 20:00</p>
          <p>Сб: 10:00 - 18:00</p>
          <p>Вс: выходной</p>
        </div>
      </div>

      {/* Нижний блок */}
      <div className="mt-8 text-center text-sm text-gray-500 border-t border-gray-700 pt-6">
        <p>&copy; {new Date().getFullYear()} Диалог души. Все права защищены.</p>
      </div>
    </footer>
  );
}

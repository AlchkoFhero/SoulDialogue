import React from 'react';
import { Phone, Mail, Instagram, Facebook } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Контакты</h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <Phone className="w-5 h-5 mr-2" />
                <a href="tel:+79179351851">+7 (917) 935-18-51</a>
              </div>
              <div className="flex items-center">
                <Mail className="w-5 h-5 mr-2" />
                <a href="mailto:contact@dialog-dushi.ru">contact@dialog-dushi.ru</a>
              </div>
              <p>г. Казань, ул. Пушкина, д. 52</p>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Следите за нами</h3>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-purple-400">
                <Instagram className="w-6 h-6" />
              </a>
              <a href="#" className="hover:text-purple-400">
                <Facebook className="w-6 h-6" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Режим работы</h3>
            <p>Пн-Пт: 9:00 - 20:00</p>
            <p>Сб: 10:00 - 18:00</p>
            <p>Вс: выходной</p>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-800 text-center">
          <p>© 2024 Диалог души. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
}
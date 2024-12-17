import React from 'react';

export function Footer() {
  return (
    <footer className="relative bg-gray-900 text-white py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Контакты */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Контакты</h3>
          <p className="mb-2">+7 (917) 935-18-51</p>
          <p className="mb-2">contact@dialog-dushi.ru</p>
          <p>г. Альметьевск, ул. Ленина, д. 52</p>
        </div>

        {/* Социальные сети */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Следите за нами</h3>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-purple-400 transition-colors duration-200">Instagram</a>
            <a href="#" className="hover:text-purple-400 transition-colors duration-200">Facebook</a>
          </div>
        </div>

        {/* Режим работы */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Режим работы</h3>
          <p className="mb-2">Пн-Пт: 9:00 - 20:00</p>
          <p className="mb-2">Сб: 10:00 - 18:00</p>
          <p>Вс: выходной</p>
        </div>
      </div>

      {/* Авторское право */}
      <div className="text-center mt-8 text-sm opacity-80">
        <p>&copy; {new Date().getFullYear()} Диалог души. Все права защищены.</p>
      </div>
    </footer>
  );
}
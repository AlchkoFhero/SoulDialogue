import React from 'react';

export function Footer() {
  return (
    <footer
      className="bg-gray-900 text-white py-8"
      data-aos="fade-up" // Анимация появления снизу вверх
      data-aos-duration="1000" // Длительность анимации для плавности
      data-aos-offset="50" // Небольшое смещение при старте
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Контакты */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Контакты</h3>
          <p>+7 (917) 935-18-51</p>
          <p>contact@dialog-dushi.ru</p>
          <p>г. Казань, ул. Пушкина, д. 52</p>
        </div>

        {/* Социальные сети */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Следите за нами</h3>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-purple-400 transition">Instagram</a>
            <a href="#" className="hover:text-purple-400 transition">Facebook</a>
          </div>
        </div>

        {/* Режим работы */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Режим работы</h3>
          <p>Пн-Пт: 9:00 - 20:00</p>
          <p>Сб: 10:00 - 18:00</p>
          <p>Вс: выходной</p>
        </div>
      </div>

      {/* Авторское право */}
      <div className="text-center mt-8 opacity-80">
        <p>&copy; 2024 Диалог души. Все права защищены.</p>
      </div>
    </footer>
  );
}

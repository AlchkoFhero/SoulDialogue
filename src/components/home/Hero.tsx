import React from 'react';
import { ChevronDown, Calendar, Phone, MessageCircle } from 'lucide-react';

export function Hero() {
  // Прокрутка вниз к секции "Услуги"
  const scrollToServices = () => {
    const servicesSection = document.getElementById('services');
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center">
      {/* Фоновое изображение */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80)',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/90 to-purple-800/70"></div>
      </div>

      {/* Основной текст и кнопки */}
      <div className="relative z-10 text-center max-w-3xl px-4">
        <h1 className="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl">
          Исцеление через <span className="text-purple-200">телесную терапию</span>
        </h1>
        <p className="mt-4 text-lg text-gray-100">
          Откройте путь к гармонии тела и души с помощью профессиональной телесной терапии.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <a
            href="https://api.whatsapp.com/send?phone=79179351851"
            className="inline-flex items-center px-6 py-3 text-base font-medium rounded-full text-white bg-green-600 hover:bg-green-700 transition"
          >
            <MessageCircle className="w-5 h-5 mr-2" /> WhatsApp
          </a>
          <a
            href="tel:+79179351851"
            className="inline-flex items-center px-6 py-3 text-base font-medium rounded-full text-white bg-blue-600 hover:bg-blue-700 transition"
          >
            <Phone className="w-5 h-5 mr-2" /> Позвонить
          </a>
          <a
            href="https://t.me/Valentina_mas5"
            className="inline-flex items-center px-6 py-3 text-base font-medium rounded-full text-white bg-[#0088cc] hover:bg-[#0077b5] transition"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.223-.548.223l.188-2.623 4.823-4.351c.192-.18-.043-.277-.297-.097l-5.945 3.734-2.471-.781c-.577-.177-.577-.577.12-.854l9.66-3.727c.425-.157.808.097.97.854z"/>
            </svg>
            Telegram
          </a>
          <a
            href="/contact"
            className="inline-flex items-center px-6 py-3 text-base font-medium rounded-full text-purple-900 bg-purple-100 hover:bg-purple-200 transition"
          >
            <Calendar className="w-5 h-5 mr-2" /> Записаться на сеанс
          </a>
        </div>
      </div>

      {/* Кликабельная стрелка */}
      <div
        onClick={scrollToServices}
        className="absolute bottom-10 left-0 right-0 mx-auto text-center cursor-pointer animate-bounce"
        >
        <ChevronDown className="w-12 h-12 text-white mx-auto" />
        <p className="text-white mt-2 text-lg font-medium">Прокрутите вниз</p>
      </div>
    </div>
  );
}

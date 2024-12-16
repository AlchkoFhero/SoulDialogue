import React from 'react';
import { Calendar, Phone, MessageCircle } from 'lucide-react';

export function Hero() {
  return (
    <div className="relative min-h-screen">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80")',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/90 to-purple-800/70" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-12">
        <div className="text-center">
          <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl">
            <span className="block">Исцеление через</span>
            <span className="block text-purple-200">телесную терапию</span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-100 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Откройте путь к гармонии тела и души с помощью профессиональной телесной терапии. Индивидуальный подход и многолетний опыт.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <a
              href="https://api.whatsapp.com/send?phone=79179351851"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full text-white bg-green-600 hover:bg-green-700 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              WhatsApp
            </a>
            <a
              href="tel:+79179351851"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full text-white bg-blue-600 hover:bg-blue-700 transition-colors"
            >
              <Phone className="w-5 h-5 mr-2" />
              Позвонить
            </a>
            <a
              href="https://t.me/Valentina_mas5"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full text-white bg-[#0088cc] hover:bg-[#0077b5] transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.223-.548.223l.188-2.623 4.823-4.351c.192-.18-.043-.277-.297-.097l-5.945 3.734-2.471-.781c-.577-.177-.577-.577.12-.854l9.66-3.727c.425-.157.808.097.97.854z"/>
              </svg>
              Telegram
            </a>
            <button className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full text-purple-900 bg-purple-100 hover:bg-purple-200 transition-colors">
              <Calendar className="w-5 h-5 mr-2" />
              Записаться на сеанс
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
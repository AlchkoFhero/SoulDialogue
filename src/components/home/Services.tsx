import React, { useEffect } from 'react';
import { Sparkles, Heart, Leaf, Brain } from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const services = [
  {
    icon: Heart,
    title: 'Массаж и телесная терапия',
    description: 'Профессиональный массаж для снятия напряжения и восстановления энергетического баланса',
    price: '4000 ₽',
  },
  {
    icon: Brain,
    title: 'Психосоматическая работа',
    description: 'Работа с эмоциональными блоками и их проявлениями в теле',
    price: '5000 ₽',
  },
  {
    icon: Leaf,
    title: 'Холистический массаж',
    description: 'Целостный подход к восстановлению баланса тела и души',
    price: '4500 ₽',
  },
  {
    icon: Sparkles,
    title: 'Энергетические практики',
    description: 'Восстановление энергетического потока и жизненных сил',
    price: '4000 ₽',
  },
];

export function Services() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: false, // Анимация запускается каждый раз при прокрутке
      mirror: true, // Анимация при прокрутке вверх
    });
  }, []);

  return (
    <section id="services" className="py-24 bg-white" data-aos="fade-up">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Заголовок секции */}
        <div className="text-center" data-aos="fade-up">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Наши услуги
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-600" data-aos="fade-up" data-aos-delay="100">
            Профессиональный подход к вашему здоровью
          </p>
        </div>

        {/* Карточки услуг */}
        <div className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => (
            <div
              key={service.title}
              className="relative bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-purple-100"
              data-aos="zoom-in"
              data-aos-delay={index * 200} // Задержка для каждой карточки
            >
              {/* Иконка */}
              <div className="absolute -top-4 left-1/2 -translate-x-1/2" data-aos="fade-down">
                <span className="inline-flex p-3 rounded-lg bg-purple-100 text-purple-800">
                  <service.icon className="h-6 w-6" />
                </span>
              </div>
              {/* Текст */}
              <div className="mt-8 text-center">
                <h3 className="text-lg font-medium text-gray-900" data-aos="fade-up">
                  {service.title}
                </h3>
                <p className="mt-2 text-sm text-gray-600" data-aos="fade-up" data-aos-delay="100">
                  {service.description}
                </p>
                <p className="mt-4 text-lg font-semibold text-purple-600" data-aos="fade-up" data-aos-delay="200">
                  {service.price}
                </p>
                <button
                  className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-colors"
                  data-aos="fade"
                  data-aos-delay="300"
                >
                  Записаться
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

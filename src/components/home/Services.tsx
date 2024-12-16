import React from 'react';
import { Sparkles, Heart, Leaf, Brain } from 'lucide-react';

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
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Наши услуги
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-600">
            Профессиональный подход к вашему здоровью
          </p>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <div
              key={service.title}
              className="relative bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-purple-100"
            >
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <span className="inline-flex p-3 rounded-lg bg-purple-100 text-purple-800">
                  <service.icon className="h-6 w-6" />
                </span>
              </div>
              <div className="mt-8 text-center">
                <h3 className="text-lg font-medium text-gray-900">{service.title}</h3>
                <p className="mt-2 text-sm text-gray-600">{service.description}</p>
                <p className="mt-4 text-lg font-semibold text-purple-600">{service.price}</p>
                <button className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-colors">
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
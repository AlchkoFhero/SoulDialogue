import React from 'react';
import { Clock, CheckCircle } from 'lucide-react';

const services = [
  {
    title: 'Классический массаж',
    description: 'Традиционный массаж для расслабления мышц и снятия напряжения',
    duration: '60 минут',
    price: '4000 ₽',
    benefits: [
      'Снимает мышечное напряжение',
      'Улучшает кровообращение',
      'Способствует расслаблению',
      'Повышает тонус организма'
    ]
  },
  {
    title: 'Холистический массаж',
    description: 'Целостный подход к работе с телом и энергетическими потоками',
    duration: '90 минут',
    price: '5000 ₽',
    benefits: [
      'Гармонизация энергетических потоков',
      'Глубокое расслабление',
      'Эмоциональная разгрузка',
      'Восстановление жизненных сил'
    ]
  },
  {
    title: 'Телесная терапия',
    description: 'Работа с телесными зажимами и эмоциональными блоками',
    duration: '90 минут',
    price: '5000 ₽',
    benefits: [
      'Освобождение от блоков',
      'Работа с эмоциями',
      'Улучшение самочувствия',
      'Повышение осознанности'
    ]
  }
];

export function Services() {
  return (
    <div className="min-h-screen bg-purple-50 pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Услуги и цены</h1>
          <p className="text-xl text-gray-600">Профессиональный подход к вашему здоровью</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {services.map((service) => (
            <div key={service.title} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="p-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">{service.title}</h2>
                <p className="text-gray-600 mb-6">{service.description}</p>
                
                <div className="flex items-center mb-6">
                  <Clock className="w-5 h-5 text-purple-600 mr-2" />
                  <span className="text-gray-600">{service.duration}</span>
                </div>

                <div className="space-y-3 mb-8">
                  {service.benefits.map((benefit) => (
                    <div key={benefit} className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-1" />
                      <span className="text-gray-600">{benefit}</span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-purple-600">{service.price}</span>
                  <button className="bg-purple-600 text-white px-6 py-2 rounded-full hover:bg-purple-700 transition-colors">
                    Записаться
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 mb-16">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Специальные предложения</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="border border-purple-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Абонемент на 10 сеансов</h3>
              <p className="text-gray-600 mb-4">
                Приобретите абонемент на 10 сеансов и получите скидку 20%
              </p>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-purple-600">32000 ₽</span>
                <span className="text-gray-500 line-through">40000 ₽</span>
              </div>
            </div>
            <div className="border border-purple-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Первое посещение</h3>
              <p className="text-gray-600 mb-4">
                Скидка 15% на первый сеанс для новых клиентов
              </p>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-purple-600">3400 ₽</span>
                <span className="text-gray-500 line-through">4000 ₽</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
import React from 'react';
import { Gift, Star, Sun } from 'lucide-react';

export function Promotions() {
  return (
    <section className="py-16 bg-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Акции и специальные предложения
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-600">
            Выгодные предложения для вашего здоровья
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-3">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-8">
              <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-lg">
                <Gift className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="mt-4 text-xl font-semibold text-gray-900">Первое посещение</h3>
              <p className="mt-2 text-gray-600">Скидка 15% на первый сеанс массажа для новых клиентов</p>
              <div className="mt-4">
                <span className="text-2xl font-bold text-purple-600">3400 ₽</span>
                <span className="ml-2 text-sm text-gray-500 line-through">4000 ₽</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-8">
              <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-lg">
                <Star className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="mt-4 text-xl font-semibold text-gray-900">Абонемент на 10 сеансов</h3>
              <p className="mt-2 text-gray-600">Экономия 20% при покупке абонемента на 10 сеансов</p>
              <div className="mt-4">
                <span className="text-2xl font-bold text-purple-600">32000 ₽</span>
                <span className="ml-2 text-sm text-gray-500 line-through">40000 ₽</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-8">
              <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-lg">
                <Sun className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="mt-4 text-xl font-semibold text-gray-900">Инфракрасная сауна</h3>
              <p className="mt-2 text-gray-600">Бесплатное посещение инфракрасной сауны после массажа</p>
              <div className="mt-4">
                <span className="text-lg font-semibold text-green-600">Бесплатно</span>
                <span className="ml-2 text-sm text-gray-500 line-through">1000 ₽</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
import React from 'react';
import { Heart, Shield, Clock, Award } from 'lucide-react';

const features = [
  {
    icon: Heart,
    title: 'Индивидуальный подход',
    description: 'Каждая программа терапии разрабатывается с учетом ваших личных потребностей и особенностей',
  },
  {
    icon: Shield,
    title: 'Безопасность',
    description: 'Все процедуры проводятся с соблюдением профессиональных стандартов и санитарных норм',
  },
  {
    icon: Clock,
    title: 'Гибкий график',
    description: 'Удобное время для сеансов, включая вечерние часы и выходные дни',
  },
  {
    icon: Award,
    title: 'Опыт и квалификация',
    description: 'Более 10 лет практики и постоянное повышение профессионального уровня',
  },
];

export function Features() {
  return (
    <div className="py-24 bg-amber-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Почему выбирают нас
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-600">
            Профессиональный подход и забота о каждом клиенте
          </p>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="relative bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <span className="inline-flex p-3 rounded-lg bg-amber-100 text-amber-800">
                  <feature.icon className="h-6 w-6" />
                </span>
              </div>
              <div className="mt-8 text-center">
                <h3 className="text-lg font-medium text-gray-900">{feature.title}</h3>
                <p className="mt-2 text-sm text-gray-600">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
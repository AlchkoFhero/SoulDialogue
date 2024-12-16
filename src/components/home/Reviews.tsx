import React from 'react';
import { Star } from 'lucide-react';

const reviews = [
  {
    id: 1,
    name: 'Елена Смирнова',
    rating: 5,
    date: '15.02.2024',
    text: 'Прекрасный специалист! После курса массажа чувствую себя обновленной. Боли в спине прошли, появилась легкость во всем теле.',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80',
  },
  {
    id: 2,
    name: 'Александр Петров',
    rating: 5,
    date: '03.03.2024',
    text: 'Очень профессиональный подход. Особенно впечатлила работа с зажимами в шейно-воротниковой зоне. Рекомендую!',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80',
  },
  {
    id: 3,
    name: 'Мария Иванова',
    rating: 5,
    date: '20.02.2024',
    text: 'Хожу регулярно уже полгода. Результат превзошел все ожидания. Спасибо за ваш профессионализм и внимательное отношение!',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80',
  },
];

export function Reviews() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Отзывы наших клиентов
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-600">
            Что говорят о нас наши клиенты
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-3">
          {reviews.map((review) => (
            <div key={review.id} className="bg-white rounded-xl shadow-lg p-8 border border-purple-100">
              <div className="flex items-center">
                <img
                  src={review.image}
                  alt={review.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">{review.name}</h3>
                  <div className="flex items-center">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
                <span className="ml-auto text-sm text-gray-500">{review.date}</span>
              </div>
              <p className="mt-4 text-gray-600">{review.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
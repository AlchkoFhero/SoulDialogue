import React from 'react';
import { Clock, User } from 'lucide-react';

const articles = [
  {
    title: 'Что такое телесная терапия и как она работает',
    excerpt: 'Узнайте о принципах телесной терапии и её влиянии на физическое и эмоциональное здоровье...',
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    author: 'Валентина Петрова',
    date: '15 марта 2024',
    readTime: '5 мин'
  },
  {
    title: 'Как справиться со стрессом через работу с телом',
    excerpt: 'Практические советы по снятию стресса и напряжения с помощью телесных практик...',
    image: 'https://images.unsplash.com/photo-1591343395082-e120087004b4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    author: 'Валентина Петрова',
    date: '10 марта 2024',
    readTime: '7 мин'
  },
  {
    title: 'Холистический подход к здоровью',
    excerpt: 'Почему важно рассматривать здоровье как единую систему и как этого достичь...',
    image: 'https://images.unsplash.com/photo-1519415387722-a1c3bbef716c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    author: 'Валентина Петрова',
    date: '5 марта 2024',
    readTime: '6 мин'
  }
];

export function Blog() {
  return (
    <div className="min-h-screen bg-purple-50 pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Блог</h1>
          <p className="text-xl text-gray-600">Полезные статьи о здоровье и телесной терапии</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {articles.map((article, index) => (
            <article key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  {article.title}
                </h2>
                <p className="text-gray-600 mb-4">
                  {article.excerpt}
                </p>
                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <User className="w-4 h-4 mr-1" />
                  <span className="mr-4">{article.author}</span>
                  <Clock className="w-4 h-4 mr-1" />
                  <span>{article.readTime}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">{article.date}</span>
                  <button className="text-purple-600 hover:text-purple-700 font-medium">
                    Читать далее
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
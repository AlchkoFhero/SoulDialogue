import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import therapistImage from '../assets/images/therapist.webp';

export function About() {
  useEffect(() => {
    AOS.init({
      duration: 800, // Длительность анимации
      easing: 'ease-in-out', // Плавность
      once: false, // Анимация срабатывает каждый раз
      mirror: true, // Срабатывает при прокрутке вверх
    });
  }, []);

  return (
    <div className="min-h-screen bg-purple-50 pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Заголовок */}
        <div className="text-center mb-12" data-aos="fade-up">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">О терапевте</h1>
          <p className="text-xl text-gray-600">Профессиональный подход к вашему здоровью</p>
        </div>

        {/* Изображение и текст */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div data-aos="fade-right">
            <img
              src={therapistImage}
              alt="Терапевт"
              className="rounded-lg shadow-lg"
            />
          </div>
          <div data-aos="fade-left">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Валентина Баранова</h2>
            <p className="text-gray-600 mb-6">
              Профессиональный телесный терапевт с более чем 10-летним опытом работы.
              Специализируюсь на холистическом подходе к здоровью, сочетая различные
              техники массажа и телесной терапии.
            </p>
            <div className="space-y-4">
              <div className="border-l-4 border-purple-500 pl-4" data-aos="fade-up" data-aos-delay="100">
                <h3 className="font-semibold text-gray-900">Образование</h3>
                <p className="text-gray-600">Московский институт психологии и телесной терапии</p>
              </div>
              <div className="border-l-4 border-purple-500 pl-4" data-aos="fade-up" data-aos-delay="200">
                <h3 className="font-semibold text-gray-900">Специализация</h3>
                <p className="text-gray-600">Телесно-ориентированная терапия, холистический массаж</p>
              </div>
              <div className="border-l-4 border-purple-500 pl-4" data-aos="fade-up" data-aos-delay="300">
                <h3 className="font-semibold text-gray-900">Опыт работы</h3>
                <p className="text-gray-600">Более 10 лет практики в области телесной терапии</p>
              </div>
            </div>
          </div>
        </div>

        {/* Сертификаты */}
        <div
          className="bg-white rounded-lg shadow-lg p-8 mb-16"
          data-aos="fade-up"
          data-aos-offset="300"
        >
          <h2 className="text-2xl font-semibold text-gray-900 mb-6" data-aos="fade-up" data-aos-delay="100">
            Сертификаты и достижения
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((cert, index) => (
              <div
                key={cert}
                className="border border-gray-200 rounded-lg p-4"
                data-aos="zoom-in"
                data-aos-delay={index * 200}
              >
                <img
                  src={`https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80`}
                  alt={`Сертификат ${cert}`}
                  className="rounded-lg mb-4"
                />
                <h3 className="font-medium text-gray-900">Сертификат специалиста</h3>
                <p className="text-gray-600">Международный институт телесной терапии</p>
              </div>
            ))}
          </div>
        </div>

        {/* Философия */}
        <div
          className="bg-purple-100 rounded-lg p-8 mb-16"
          data-aos="fade-up" // Анимация появления снизу вверх
          data-aos-offset="300" // Анимация при прокрутке до секции
        >
          <h2
            className="text-2xl font-semibold text-gray-900 mb-6"
            data-aos="fade-up"
            data-aos-delay="100" // Задержка для заголовка
          >
            Моя философия
          </h2>
          <div className="prose max-w-none text-gray-600">
            <p className="mb-4" data-aos="fade-up" data-aos-delay="200">
              Я верю в целостный подход к здоровью человека, где тело и душа неразрывно связаны.
              Каждый клиент уникален, и моя задача – найти индивидуальный подход к решению
              его проблем.
            </p>
            <p data-aos="fade-up" data-aos-delay="300">
              В своей работе я использую различные техники и методики, постоянно
              совершенствую свои навыки и расширяю профессиональные знания для
              достижения наилучших результатов.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

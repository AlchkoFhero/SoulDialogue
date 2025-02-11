import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const faqs = [
  {
    question: 'Что такое телесная терапия?',
    answer: 'Телесная терапия - это комплексный подход к здоровью, который работает с физическим и эмоциональным состоянием человека через тело. Это метод помогает снять напряжение, улучшить самочувствие и решить психосоматические проблемы.'
  },
  {
    question: 'Как подготовиться к сеансу?',
    answer: 'Рекомендуется прийти на сеанс в удобной одежде, не есть за 1-2 часа до процедуры. Важно быть в спокойном состоянии и настроиться на работу с телом.'
  },
  {
    question: 'Сколько длится сеанс?',
    answer: 'Стандартный сеанс длится 60-90 минут, в зависимости от выбранной программы и индивидуальных потребностей.'
  },
  {
    question: 'Есть ли противопоказания?',
    answer: 'Да, существуют стандартные противопоказания: острые воспалительные процессы, высокая температура, онкологические заболевания в острой фазе, период обострения хронических заболеваний.'
  },
  {
    question: 'Как часто нужно проходить сеансы?',
    answer: 'Частота сеансов определяется индивидуально, в зависимости от ваших целей и состояния. Обычно рекомендуется курс из 5-10 сеансов с периодичностью 1-2 раза в неделю.'
  },
  {
    question: 'Какой эффект можно ожидать после первого сеанса?',
    answer: 'После первого сеанса обычно ощущается расслабление, снижение мышечного напряжения, улучшение настроения. Однако для достижения устойчивого результата рекомендуется пройти полный курс.'
  }
];

export function FAQ() {
  useEffect(() => {
    AOS.init({
      duration: 800, // Длительность анимации
      easing: 'ease-in-out', // Плавность анимации
      once: false, // Анимация при каждом появлении элемента
      mirror: true, // Повтор анимации при прокрутке вверх
    });
  }, []);

  return (
    <div className="min-h-screen bg-purple-50 py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1
          className="text-4xl font-bold text-center text-gray-900 mb-12"
          data-aos="fade-up"
        >
          Часто задаваемые вопросы
        </h1>
        <div className="space-y-8">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
              data-aos="fade-up"
              data-aos-delay={index * 100} // Задержка появления для каждого вопроса
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {faq.question}
              </h3>
              <p className="text-gray-600">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

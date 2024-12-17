import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Home } from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const articles = [
  {
    id: 1,
    title: 'Что такое телесная терапия и как она работает',
    fullText: `
      Телесная терапия — это метод работы с телом, направленный на восстановление физического и эмоционального здоровья. 
      Она основана на понимании того, что физическое состояние тела и психоэмоциональные переживания тесно взаимосвязаны.

      Принципы телесной терапии:
      Целостность тела и души — каждый дискомфорт в теле связан с внутренними переживаниями.
      Работа с зажимами — расслабление мышечных блоков помогает освободиться от подавленных эмоций.
      Осознанное дыхание — техника дыхания помогает снизить стресс и улучшить циркуляцию энергии.

      Как это работает?
      Во время сеанса терапевт использует мягкие прикосновения, техники массажа и дыхательные упражнения для расслабления тела. 
      Это позволяет снять напряжение и восстановить баланс.

      Результаты:
      - Улучшение физического самочувствия.
      - Снятие стресса и эмоционального напряжения.
      - Повышение уровня энергии и осознанности.
    `,
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    date: '15 марта 2024',
    readTime: '5 мин',
  },
  {
    id: 2,
    title: 'Как справиться со стрессом через работу с телом',
    fullText: `
      Стресс — это естественная реакция организма на сложные жизненные ситуации. Однако хронический стресс негативно влияет на здоровье.

      Телесные практики для снятия стресса:
      1. Дыхательные упражнения: Медленное дыхание помогает снизить уровень кортизола — гормона стресса.
      2. Растяжка и расслабление: Простые движения снимают напряжение в теле.
      3. Телесная терапия: Сеанс помогает восстановить баланс тела и ума.

      Регулярные практики позволяют улучшить качество жизни и поддерживать эмоциональную стабильность.
    `,
    image: 'https://images.unsplash.com/photo-1591343395082-e120087004b4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    date: '10 марта 2024',
    readTime: '7 мин',
  },
  {
    id: 3,
    title: 'Холистический подход к здоровью',
    fullText: `
      Холистический подход рассматривает здоровье человека как единую систему, где тело, разум и душа тесно взаимосвязаны.

      Основные принципы:
      - Баланс физического и эмоционального состояния.
      - Профилактика вместо лечения симптомов.
      - Индивидуальный подход к каждому человеку.

      Практики холистического подхода включают:
      - Массаж и телесную терапию.
      - Медитацию и дыхательные упражнения.
      - Психосоматическую работу для высвобождения эмоциональных блоков.

      Такой подход помогает восстановить гармонию и улучшить общее самочувствие.
    `,
    image: 'https://images.unsplash.com/photo-1519415387722-a1c3bbef716c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    date: '5 марта 2024',
    readTime: '6 мин',
  },
];

export function Article() {
  const { id } = useParams();
  const articleId = Number(id);
  const article = articles.find((a) => a.id === articleId);

  const prevArticle = articles.find((a) => a.id === articleId - 1);
  const nextArticle = articles.find((a) => a.id === articleId + 1);

  useEffect(() => {
    // Инициализация AOS и прокрутка страницы к началу
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true,
    });

    window.scrollTo(0, 0); // Прокручиваем страницу к началу при загрузке новой статьи
  }, [id]); // Добавляем зависимость id для срабатывания при изменении статьи

  if (!article) {
    return <div className="text-center py-20 text-xl text-gray-700">Статья не найдена.</div>;
  }

  return (
    <div className="min-h-screen bg-purple-50 pt-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Заголовок */}
        <h1 className="text-4xl font-bold text-gray-900 mb-6 text-center" data-aos="fade-up">
          {article.title}
        </h1>
        <p className="text-gray-500 text-center mb-8" data-aos="fade-up" data-aos-delay="100">
          {article.date} • {article.readTime}
        </p>

        {/* Изображение */}
        <div className="mb-8" data-aos="fade-up" data-aos-delay="200">
          <img src={article.image} alt={article.title} className="w-full rounded-lg shadow-lg" />
        </div>

        {/* Текст статьи */}
        <div
          className="prose max-w-none text-gray-700 text-lg leading-relaxed"
          data-aos="fade-in"
          data-aos-delay="300"
        >
          {article.fullText.split('\n').map((paragraph, index) => (
            <p key={index} className="mb-6">
              {paragraph.trim()}
            </p>
          ))}
        </div>

        {/* Навигация */}
        <div className="flex justify-between items-center mt-8">
          {prevArticle ? (
            <Link
              to={`/blog/${prevArticle.id}`}
              className="flex items-center text-gray-600 hover:text-gray-800"
            >
              <ArrowLeft className="w-5 h-5 mr-2" /> {prevArticle.title}
            </Link>
          ) : (
            <div />
          )}

          <Link to="/blog" className="text-gray-600 hover:text-gray-800">
            <Home className="w-5 h-5 inline-block mr-2" /> Вернуться в блог
          </Link>

          {nextArticle ? (
            <Link
              to={`/blog/${nextArticle.id}`}
              className="flex items-center text-gray-600 hover:text-gray-800"
            >
              {nextArticle.title} <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          ) : (
            <div />
          )}
        </div>
      </div>
    </div>
  );
}

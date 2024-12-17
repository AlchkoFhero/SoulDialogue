import React, { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const images = [
  {
    url: 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    title: 'Массажный кабинет',
  },
  {
    url: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    title: 'Зона отдыха',
  },
  {
    url: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    title: 'Инфракрасная сауна',
  },
  {
    url: 'https://images.unsplash.com/photo-1591343395082-e120087004b4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    title: 'Процедурный кабинет',
  },
  {
    url: 'https://images.unsplash.com/photo-1519415387722-a1c3bbef716c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    title: 'Зона ожидания',
  },
  {
    url: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    title: 'Рабочее пространство',
  },
];

export function Gallery() {
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    AOS.init({
      duration: 800, // Длительность анимации
      easing: 'ease-in-out',
      once: false,
      mirror: true,
    });
  }, []);

  const openImage = (image) => {
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className="min-h-screen bg-purple-50 pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Заголовок */}
        <div className="text-center mb-12" data-aos="fade-up">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Галерея</h1>
          <p className="text-xl text-gray-600" data-aos="fade-up" data-aos-delay="100">
            Познакомьтесь с нашим пространством
          </p>
        </div>

        {/* Галерея изображений */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {images.map((image, index) => (
            <div
              key={index}
              className="relative group overflow-hidden rounded-lg shadow-lg aspect-w-4 aspect-h-3 cursor-pointer"
              data-aos="zoom-in"
              data-aos-delay={index * 100}
              onClick={() => openImage(image)}
            >
              <img
                src={image.url}
                alt={image.title}
                className="w-full h-64 object-cover transform group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-white text-lg font-semibold">{image.title}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Модальное окно для изображения */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
          <button
            className="absolute top-4 right-4 text-white text-3xl font-bold"
            onClick={closeModal}
          >
            &times;
          </button>
          <img
            src={selectedImage.url}
            alt={selectedImage.title}
            className="max-w-full max-h-full rounded-lg shadow-lg"
          />
          <div className="absolute bottom-8 text-white text-lg">{selectedImage.title}</div>
        </div>
      )}
    </div>
  );
}

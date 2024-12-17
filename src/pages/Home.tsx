import React from 'react';
import { Hero } from '../components/home/Hero';
import { Services } from '../components/home/Services';
import { Promotions } from '../components/home/Promotions';
import { Features } from '../components/home/Features';
import { Reviews } from '../components/home/Reviews';
import { Contact } from '../components/home/Contact';

export function Home() {
  return (
    <div>
      {/* Hero Секция */}
      <section data-aos="fade-up">
        <Hero />
      </section>

      {/* Наши услуги */}
      <section id="services" data-aos="fade-up" data-aos-delay="100">
        <Services />
      </section>

      {/* Акции и специальные предложения */}
      <section data-aos="fade-up" data-aos-delay="200">
        <Promotions />
      </section>

      {/* Почему выбирают нас */}
      <section data-aos="fade-up" data-aos-delay="300">
        <Features />
      </section>

      {/* Отзывы наших клиентов */}
      <section data-aos="fade-up" data-aos-delay="400">
        <Reviews />
      </section>

      {/* Свяжитесь с нами */}
      <section data-aos="fade-up" data-aos-delay="500">
        <Contact />
      </section>
    </div>
  );
}

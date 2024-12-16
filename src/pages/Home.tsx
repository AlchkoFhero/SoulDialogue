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
      <Hero />
      <Services />
      <Promotions />
      <Features />
      <Reviews />
      <Contact />
    </div>
  );
}
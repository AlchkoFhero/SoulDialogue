import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css'; // Стили для AOS

import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Services } from './pages/Services';
import { Reviews } from './pages/Reviews';
import { Gallery } from './pages/Gallery';
import { Blog } from './pages/Blog';
import { Article } from './pages/Article'; // Новый компонент для детальной статьи
import { Contact } from './pages/Contact';
import { FAQ } from './pages/FAQ';

function App() {
  useEffect(() => {
    AOS.init({
      duration: 800, // Длительность анимации
      easing: 'ease-in-out', // Плавность анимации
      once: false, // Анимация запускается каждый раз
      mirror: true, // Срабатывание при прокрутке вверх
    });
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<Article />} /> {/* Новый маршрут */}
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/faq" element={<FAQ />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

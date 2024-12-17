import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, MessageCircle } from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const navigation = [
  { name: 'Главная', href: '/' },
  { name: 'О терапевте', href: '/about' },
  { name: 'Услуги', href: '/services' },
  { name: 'Галерея', href: '/gallery' },
  { name: 'Блог', href: '/blog' },
  { name: 'FAQ', href: '/faq' },
  { name: 'Контакты', href: '/contact' },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Инициализация AOS
  useEffect(() => {
    AOS.init({
      duration: 500, // Быстрая, ненавязчивая анимация
      easing: 'ease-out',
      once: true,
    });
  }, []);

  return (
    <header className="fixed w-full bg-white/90 backdrop-blur-sm shadow-sm z-50">
      <div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        data-aos="fade-down"
      >
        <div className="flex justify-between items-center py-4">
          {/* Название сайта */}
          <div>
            <Link to="/" className="text-2xl font-semibold">
              <span className="text-purple-500">Диалог</span>
              <span className="text-purple-800"> души</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="text-gray-700 hover:text-purple-800 transition-colors text-sm font-medium"
                data-aos="fade"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* WhatsApp Button */}
          <a
            href="https://api.whatsapp.com/send?phone=79179351851"
            className="hidden md:flex items-center px-4 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition-transform duration-300"
            target="_blank"
            rel="noopener noreferrer"
            data-aos="zoom-in"
          >
            <MessageCircle className="w-5 h-5 mr-2" />
            WhatsApp
          </a>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-purple-800 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

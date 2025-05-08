import React from 'react';
import { Phone, Mail, MapPin, Instagram } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
        {/* Контакты */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold mb-4 text-purple-400">Контакты</h3>
          <div className="flex items-center justify-center md:justify-start space-x-2">
            <Phone className="w-5 h-5 text-purple-400" />
            <a
              href="tel:+79179351851"
              className="hover:text-purple-400 transition-colors duration-300"
            >
              +7 (917) 935-18-51
            </a>
          </div>

          <div className="flex items-center justify-center md:justify-start space-x-2">
            <MapPin className="w-5 h-5 text-purple-400" />
            <a
              href="https://yandex.ru/map-widget/v1/?um=constructor%3Add690dd52bbe3d3d5274709c0a162d4c92ea93a886cb4f42ee0868cac94ebf43&source=constructor"
              className="hover:text-purple-400 transition-colors duration-300"
              target="_blank"
              rel="noopener noreferrer"
            >
              г. Альметьевск, ул. Ленина, д. 2
            </a>
          </div>
        </div>

        {/* Социальные сети */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-purple-400 text-center">Следите за нами</h3>
          <div className="flex justify-center space-x-12">
            <a
              href="https://www.instagram.com/massage_dialog_dushi/"
              className="text-gray-400 hover:text-purple-400 transform hover:scale-110 transition duration-300"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Наш Instagram"
            >
              <Instagram className="w-12 h-12" />
            </a>
            <a
              href="https://vk.com/id468247253"
              className="text-gray-400 hover:text-purple-400 transform hover:scale-110 transition duration-300"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Наш ВКонтакте"
            >
              <svg
                viewBox="0 0 24 24"
                className="w-12 h-12 fill-current"
              >
                <path d="M12.785 16.241s.288-.032.436-.194c.136-.148.132-.427.132-.427s-.02-1.304.576-1.496c.588-.19 1.341 1.26 2.14 1.818.605.422 1.064.33 1.064.33l2.137-.03s1.117-.071.587-.964c-.043-.073-.308-.661-1.588-1.87-1.34-1.264-1.16-1.059.453-3.246.983-1.332 1.376-2.145 1.253-2.493-.117-.332-.84-.244-.84-.244l-2.406.015s-.178-.025-.31.056c-.13.079-.212.262-.212.262s-.382 1.03-.89 1.907c-1.07 1.85-1.499 1.948-1.674 1.832-.407-.267-.305-1.075-.305-1.648 0-1.793.267-2.54-.521-2.733-.262-.065-.455-.107-1.123-.114-.858-.009-1.585.003-1.996.208-.274.136-.485.44-.356.457.159.022.519.099.71.363.246.341.237 1.107.237 1.107s.142 2.11-.33 2.371c-.325.18-.77-.187-1.725-1.865-.489-.859-.859-1.81-.859-1.81s-.07-.176-.198-.272c-.154-.115-.37-.151-.37-.151l-2.286.015s-.343.01-.469.161C3.94 7.721 4.043 8 4.043 8s1.79 4.258 3.817 6.403c1.858 1.967 3.968 1.838 3.968 1.838h.957z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Режим работы */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold mb-4 text-purple-400">Режим работы</h3>
          <p>Пн-Вс: 7:00 - 20:00</p>
          <p>По предварительной записи</p>
        </div>
      </div>

      {/* Предупреждение о Meta */}
      <div className="max-w-[800px] mx-auto px-5 mt-8 mb-5 text-center text-[13px] text-gray-400 leading-relaxed">
        * Facebook и Instagram являются продуктами компании Meta Platforms Inc., признанной экстремистской
        организацией.<br />
        Деятельность Meta Platforms Inc. запрещена на территории Российской Федерации.
      </div>

      {/* Нижний блок */}
      <div className="mt-8 text-center text-sm text-gray-500 border-t border-gray-700 pt-6">
        <p>&copy; {new Date().getFullYear()} Диалог души & TQB & ALEFX. Все права защищены.</p>
      </div>
    </footer>
  );
}


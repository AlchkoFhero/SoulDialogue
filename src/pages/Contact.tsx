import React, { useEffect, useState, useLayoutEffect, useRef } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Phone, MapPin, MessageCircle, Clock } from 'lucide-react';

export function Contact() {
  const contentRef = useRef(null);
  const [layoutShift, setLayoutShift] = useState(0);

  useEffect(() => {
    AOS.init({ duration: 600, easing: 'ease-in-out', once: true, mirror: false });
    AOS.refresh();
  }, []);

  useLayoutEffect(() => {
    if (contentRef.current) {
      const contentBox = contentRef.current.getBoundingClientRect();
      const initialHeight = contentBox.height;

      window.requestAnimationFrame(() => {
        if (contentRef.current) {
          const newContentBox = contentRef.current.getBoundingClientRect();
          const newHeight = newContentBox.height;
          setLayoutShift(newHeight - initialHeight);
        }
      });
    }
  }, [layoutShift]);

  const [formData, setFormData] = useState({ name: '', phone: '', message: '', honeypot: '' });
  const [responseMessage, setResponseMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setResponseMessage('');

    if (formData.honeypot) return;

    if (!formData.name.trim() || !formData.phone.trim() || !formData.message.trim()) {
      setResponseMessage('Пожалуйста, заполните все поля.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/.netlify/functions/sendTelegramMessage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      if (!response.ok || data.error) throw new Error(data.error || 'Ошибка при отправке');

      setResponseMessage('Сообщение успешно отправлено!');
      setFormData({ name: '', phone: '', message: '', honeypot: '' });
    } catch (error) {
      console.error('Ошибка отправки:', error.message);
      setResponseMessage('Ошибка сервера. Попробуйте позже.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ marginTop: layoutShift > 0 ? `-${layoutShift}px` : 0 }} className="bg-purple-50 pt-24 transition-all duration-300">
      <div className="max-w-screen-md mx-auto px-4 sm:px-6 lg:px-8 py-10" ref={contentRef}>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="hidden">
            <label htmlFor="honeypot">Leave this empty</label>
            <input id="honeypot" type="text" value={formData.honeypot} onChange={handleChange} autoComplete="off" />
          </div>
          <div>
            <label htmlFor="name">Ваше имя</label>
            <input id="name" type="text" value={formData.name} onChange={handleChange} required />
          </div>
          <div>
            <label htmlFor="phone">Телефон</label>
            <input id="phone" type="tel" value={formData.phone} onChange={handleChange} required />
          </div>
          <div>
            <label htmlFor="message">Сообщение</label>
            <textarea id="message" rows="4" value={formData.message} onChange={handleChange} required></textarea>
          </div>
          <button type="submit" disabled={loading}>
            {loading ? 'Отправка...' : 'Отправить'}
          </button>
          {responseMessage && <p className="mt-2 text-center text-sm text-gray-600">{responseMessage}</p>}
        </form>
      </div>
    </div>
  );
}

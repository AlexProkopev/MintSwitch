// src/components/ContactForm.jsx
import React, { useState } from 'react';
import { FaUser, FaEnvelope, FaTag, FaPaperPlane, FaTelegramPlane } from 'react-icons/fa';
import './Contact.css';
import Loader from '../../components/Loader/Loader';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Здесь можно добавить код для отправки данных формы на сервер
    try {
      // Симуляция отправки данных
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log('Form submitted', formData);
      alert('Спасибо за ваше сообщение! Мы свяжемся с вами на указанный email.');
    } catch (error) {
      console.error('Ошибка при отправке формы:', error);
      alert('Произошла ошибка. Пожалуйста, попробуйте снова позже.');
    } finally {
      setLoading(false);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
    }
  };

  return (
    <div className="contact-form-container">
      <h2 className="contact-form-title">Связаться с нами</h2>
      <form onSubmit={handleSubmit} className="contact-form">
        <div className="contact-form-group">
          <FaUser className="contact-form-icon" />
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Введите ваше имя"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="contact-form-group">
          <FaEnvelope className="contact-form-icon" />
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Введите ваш email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="contact-form-group">
          <FaTag className="contact-form-icon" />
          <input
            type="text"
            id="subject"
            name="subject"
            placeholder="Номер заявки"
            value={formData.subject}
            onChange={handleChange}
            required
          />
        </div>

        <div className="contact-form-group">
          <textarea
            id="message"
            name="message"
            placeholder="Введите ваше сообщение"
            value={formData.message}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="contact-form-button" disabled={loading}>
        <>
              <FaPaperPlane className="contact-form-button-icon" />
              Отправить
            </>
          {loading && <Loader />}
        </button>
      </form>

      <div className="contact-form-telegram">
       <a href="https://t.me/yourtelegramusername" target="_blank" rel="noopener noreferrer">
          <FaTelegramPlane className="contact-form-telegram-icon" />
          Telegram
        </a>
      </div>
    </div>
  );
};

export default Contact;

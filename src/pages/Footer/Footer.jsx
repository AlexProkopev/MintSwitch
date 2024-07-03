import React from 'react';

import './Footer.css';
import { Link } from 'react-router-dom';
import { TERMS_ROUTE } from '../../components/routes/routes';

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="footer-banners">
          <div className="footer-banner">
            <img src="https://via.placeholder.com/300x100?text=Лучшие+курсы+валют" alt="Лучшие курсы валют" />
          </div>
          <div className="footer-banner">
            <img src="https://via.placeholder.com/300x100?text=Безопасный+обмен" alt="Безопасный обмен" />
          </div>
          <div className="footer-banner">
            <img src="https://via.placeholder.com/300x100?text=Надежный+сервис" alt="Надежный сервис" />
          </div>
        </div>
        <div className="footer-info">
          <p>© 2023 MintSwitch. Все права защищены.</p>
          <p>Создано с ❤️ для вас</p>

          <Link to={TERMS_ROUTE}>Правила сайта</Link>
        </div>
       
      </div>
    </footer>
  );
};

export default Footer;

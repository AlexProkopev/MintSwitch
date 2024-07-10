import React from 'react';

import './Footer.css';
import { Link } from 'react-router-dom';
import { NOTICE_ROUTE, SITEMAP_ROUTE, TERMS_ROUTE } from '../../components/routes/routes';

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="footer-banners">
          <a href='https://www.bestchange.ru/' target='blank' className="footer-banner">
            <img src="https://www.bestchange.com/images/apple-touch-icon-310x310.png" alt="Лучшие курсы валют" />
          </a>
          <a href="https://kurs.expert/" target='blank' className="footer-banner">
            <img src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgguKkm2wXFtQw-vWU5SLBw7vj66YUzilPL8fXfEPpsml7zAFv90NaVK6f2P535DpoyuLsZlVCGLC-8gmk0vbJMCwycezpUivgtqYVxHxzeK2D-f5FwD71qJEVeQ33OBjqovt3xfxQjK_8/s1600-rw/pic-min.jpg" alt="Безопасный обмен" />
          </a>
          
        </div>
        <div className="footer-info">
          <p>© 2023 MintSwitch. Все права защищены.</p>
          <Link to={NOTICE_ROUTE}>Предупреждение</Link>
          <Link to={SITEMAP_ROUTE}>Карта сайта</Link>
          <Link to={TERMS_ROUTE}>Правила</Link>
        </div>
       
      </div>
    </footer>
  );
};

export default Footer;

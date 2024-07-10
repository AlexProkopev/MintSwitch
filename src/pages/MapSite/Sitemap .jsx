import React from 'react';
import { Link } from 'react-router-dom';
import {
  CHANGE_ROUTE,
  ROAD_ROUTE,
  CABINET_ROUTE,
  REGISTER_ROUTE,
  AUTH_ROUTE,
  CRYPTOTABLE_ROUTE,
  TERMS_ROUTE,
  CONTACTS_ROUTE,
} from '../../components/routes/routes';
import './Sitemap.css';

const Sitemap = () => {
  return (
    <div className="sitemap-container">
      <h2>Карта сайта</h2>
      <div className="sitemap-grid">
        <div className="sitemap-card">
          <Link to={CHANGE_ROUTE}>Обмен</Link>
        </div>
        <div className="sitemap-card">
          <Link to={ROAD_ROUTE}>AML Политика</Link>
        </div>
        <div className="sitemap-card">
          <Link to={CABINET_ROUTE}>Кабинет</Link>
        </div>
        <div className="sitemap-card">
          <Link to={REGISTER_ROUTE}>Регистрация</Link>
        </div>
        <div className="sitemap-card">
          <Link to={AUTH_ROUTE}>Вход</Link>
        </div>
        <div className="sitemap-card">
          <Link to={CRYPTOTABLE_ROUTE}>Крипто Таблица</Link>
        </div>
        <div className="sitemap-card">
          <Link to={TERMS_ROUTE}>Условия</Link>
        </div>
        <div className="sitemap-card">
          <Link to="/reviews">Отзывы</Link>
        </div>
        <div className="sitemap-card">
          <Link to={CONTACTS_ROUTE}>Контакты</Link>
        </div>
      </div>
    </div>
  );
};

export default Sitemap;

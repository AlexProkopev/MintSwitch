import React, { useState, useRef, useEffect, useCallback } from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css';
import { CABINET_ROUTE, CHANGE_ROUTE, CONTACTS_ROUTE, CRYPTOTABLE_ROUTE, ROAD_ROUTE } from '../routes/routes';
import Logo from '../Logo/Logo';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  // Функция для переключения меню
  const toggleMenu = () => setIsMenuOpen(prev => !prev);

  // Функция для закрытия меню
  const closeMenu = useCallback(() => setIsMenuOpen(false), []);

  // Функция для обработки кликов вне меню
  const handleClickOutside = useCallback((event) => {
    if (menuRef.current && !menuRef.current.contains(event.target) && !event.target.closest('.burger-menu')) {
      closeMenu();
    }
  }, [closeMenu]);

  // Добавляем и удаляем обработчик кликов вне меню
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [handleClickOutside]);

  return (
    <header className='header-container'>
      <NavLink to={CHANGE_ROUTE} className='logo-link'>
        <Logo />
      </NavLink>
      <button className={`burger-menu ${isMenuOpen ? 'open' : ''}`} onClick={toggleMenu}>
        <span className='burger-bar'></span>
        <span className='burger-bar'></span>
        <span className='burger-bar'></span>
      </button>
      <nav className={`nav-links ${isMenuOpen ? 'open' : ''}`} ref={menuRef}>
        
        <NavLink 
          to={CHANGE_ROUTE} 
          className={({ isActive }) => isActive ? 'nav-link active-link' : 'nav-link'}
          onClick={closeMenu} // Закрытие меню при выборе страницы
        >
          Обмен
        </NavLink>
        <NavLink 
          to={CABINET_ROUTE} 
          className={({ isActive }) => isActive ? 'nav-link active-link' : 'nav-link'}
          onClick={closeMenu} // Закрытие меню при выборе страницы
        >
          Кабинет
        </NavLink>
        <NavLink 
          to={ROAD_ROUTE} 
          className={({ isActive }) => isActive ? 'nav-link active-link' : 'nav-link'}
          onClick={closeMenu} // Закрытие меню при выборе страницы
        >
          AML правила
        </NavLink>
        <NavLink 
          to={CONTACTS_ROUTE} 
          className={({ isActive }) => isActive ? 'nav-link active-link' : 'nav-link'}
          onClick={closeMenu} // Закрытие меню при выборе страницы
        >
          Контакты
        </NavLink>
        <NavLink 
          to={CRYPTOTABLE_ROUTE} 
          className={({ isActive }) => isActive ? 'nav-link active-link' : 'nav-link'}
          onClick={closeMenu} // Закрытие меню при выборе страницы
        >
          Курсы валют
        </NavLink>
      </nav>
    </header>
  );
}

export default Header;

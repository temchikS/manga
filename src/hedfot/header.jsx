import React from 'react';
import './header.css';

function Header() {
  return (
    <div className="header">
      <a href="/" className='header_logo'>
        <img src="berserk.jpg" alt="Manga" width="100" height="100" />
      </a>
      <div className="header_button">
        <div className="header_item"><span>Главная</span></div>
        <div className="header_item"><span>О нас</span></div>
        <div className="header_item"><span>Коллекция</span></div>
        <div className="header_item"><span>Профиль</span></div>
      </div>
    </div>
  );
}

export default Header;

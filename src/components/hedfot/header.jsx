import React from 'react';
import './header.css';
import { Link } from 'react-router-dom';
import SearchBar from '../search/search';
function Header() {
  return (
    <div className="header">
      <Link to={`/`}>
        <a href="/" className='header_logo'>
          <img src="berserk.jpg" alt="Manga" width="100" height="100" />
        </a>
      </Link>
      <div className="header_buttons">
        <div className="header_item"><span>Главная</span></div>
        <div className="header_item"><span>О нас</span></div>
        <div className="header_item"><span>Коллекция</span></div>
        <div className="header_item"><span>Профиль</span></div>
      </div>
      <SearchBar/>
    </div>
  );
}

export default Header;

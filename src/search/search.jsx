import React, { useState } from 'react';
import './search.css'; 

function SearchBar() {
  const [query, setQuery] = useState('');

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSearch = () => {
    // Здесь можно добавить логику для поиска
    console.log('Выполняется поиск по запросу:', query);
  };

  return (
    <div className="search-bar-container"> {/* Применяем класс контейнера */}
      <input
        type="text"
        placeholder="Введите запрос"
        value={query}
        onChange={handleInputChange}
        className="search-input" // Применяем класс для стилизации инпута
      />
      <button onClick={handleSearch} className="search-button">Поиск</button> {/* Применяем класс для стилизации кнопки */}
    </div>
  );
}

export default SearchBar;

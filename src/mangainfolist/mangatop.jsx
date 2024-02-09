import React from "react";
import './mangatop.css'

function MangaInfoBox() {
  // Предположим, у вас есть массив с данными о мангах
  const mangaData = [
    { title: 'Манга 1', imageUrl: 'berserk.jpg' },
    { title: 'Манга 2', imageUrl: 'one_piece.jpg' },
    { title: 'Манга 3', imageUrl: 'naruto.jpg' },
    { title: 'Манга 1', imageUrl: 'berserk.jpg' },
    { title: 'Манга 2', imageUrl: 'one_piece.jpg' },
    { title: 'Манга 3', imageUrl: 'naruto.jpg' },
    { title: 'Манга 1', imageUrl: 'berserk.jpg' },
    { title: 'Манга 2', imageUrl: 'one_piece.jpg' },
    { title: 'Манга 3', imageUrl: 'naruto.jpg' },
    // Добавьте сюда остальные манги
  ];

  return (
    <div>
      <h2>Популярные манги</h2>
      <div className="manga-info-box"> {/* Применяем класс контейнера */}
        <div className="manga-list"> {/* Применяем класс для списка манги */}
          {mangaData.map((manga, index) => (
            <div className="manga-cell" key={index}> {/* Применяем класс для каждой манги */}
              <img src={`/${manga.imageUrl}`} alt={manga.title} /> {/* Добавляем изображение из папки public */}
              <p>{manga.title}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MangaInfoBox;

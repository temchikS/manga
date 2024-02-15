import React, { useEffect, useState } from 'react';
import './mangatop.css'
import { Link } from 'react-router-dom';
import axios from 'axios';
function MangaInfoBox() {
  const [mangaList, setMangaList] = useState([]);

  useEffect(() => {
    const apiUrl = 'https://graphql.anilist.co';

    axios({
      method: 'post',
      url: `${apiUrl}/graphql`,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      data: {
        query: `
          query {
            Page(page: 1, perPage: 5000) {
              media(type: MANGA) {
                id
                title {
                  romaji
                }
                coverImage {
                  large
                }
              }
            }
          }
        `,
      },
    })
      .then((response) => {
        setMangaList(response.data.data.Page.media);
      })
      .catch((error) => {
        console.error('Error fetching manga list:', error);
      });
  }, []);

  return (
    <div>
      <h2>Популярные манги</h2>
      <div className="manga-info-box"> {/* Применяем класс контейнера */}
        <div className="manga-list"> {/* Применяем класс для списка манги */}
          {mangaList.map((manga) => (
              <Link to={`/manga/${manga.title.romaji.replace(/\s+/g, '-')}/${manga.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <li key={manga.id} className='manga-item'>
                  <img src={manga.coverImage.large} alt={manga.title.romaji} />
                  <p>{manga.title.romaji}</p>
                </li>
              </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MangaInfoBox;

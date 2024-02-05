import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import axios from 'axios';

const MangaReader = () => {
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
            Page(page: 1, perPage: 1000) {
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
      <h1>Manga Reader</h1>
      <ul>
        {mangaList.map((manga) => (
          <li key={manga.id}>
            <Link to={`/manga/${manga.id}`}>
              <img src={manga.coverImage.large} alt={manga.title.romaji} />
            </Link>
            <p>{manga.title.romaji}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MangaReader;
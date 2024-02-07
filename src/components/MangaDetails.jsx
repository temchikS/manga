import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const MangaDetails = () => {
  const { id } = useParams();
  const [mangaDetails, setMangaDetails] = useState(null);

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
            Media(id: ${id}, type: MANGA) {
              id
              title {
                romaji
              }
              description
              genres
              chapters
              coverImage {
                large
              }
            }
          }
        `,
      },
    })
      .then((response) => {
        setMangaDetails(response.data.data.Media);
      })
      .catch((error) => {
        console.error('Error fetching manga details:', error);
      });
  }, [id]);

  const handleGetChapters = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:5000/api/get_data/chapters/${mangaDetails.title.romaji.replace(/\s+/g, '-')}`, { headers: { 'Access-Control-Allow-Origin': '*' } });
      console.log(response.data);
    } catch (error) {
      console.error('Ошибка при запросе данных:', error);
    }
  };

  const handleGetPages = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:5000/api/get_data/pages/${mangaDetails.title.romaji.replace(/\s+/g, '-')}`, { headers: { 'Access-Control-Allow-Origin': '*' }});
      console.log(response.data);
    } catch (error) {
      console.error('Ошибка при запросе данных:', error);
    }
  };

  if (!mangaDetails) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>{mangaDetails.title.romaji}</h2>
      <p>Manga ID: {mangaDetails.id}</p>
      <img src={mangaDetails.coverImage.large} alt={mangaDetails.title.romaji} />
      <p>Description: {mangaDetails.description}</p>
      <p>Genres: {mangaDetails.genres.join(', ')}</p>
      <p>Chapters: {mangaDetails.chapters}</p>
      <button onClick={handleGetChapters}>получить томы и главы</button>
      <button onClick={handleGetPages}>получить страницы</button>
    </div>
  );
};

export default MangaDetails;

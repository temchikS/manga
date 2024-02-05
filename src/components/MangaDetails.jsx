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

    </div>
  );
};

export default MangaDetails;

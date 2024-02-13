import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

const MangaDetails = () => {
  const { id } = useParams();
  const [mangaDetails, setMangaDetails] = useState(null);
  const [isData,setData] = useState(null)
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
                english
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
        console.log("data_loaded")
      })
      .catch((error) => {
        console.error('Error fetching manga details:', error);
      });
  }, [id]);

  useEffect(() => {
    const fetchData = async () => {
      if (mangaDetails) {
          try {
            const response = await axios.get(`http://127.0.0.1:5000/api/get_data/chapters/${mangaDetails.title.romaji.replace(/\s+/g, '-')}`, { headers: { 'Access-Control-Allow-Origin': '*' } });
            console.log(response.data)
            setData(true)
            } catch (error) {
            console.error("Ошибка при запросе данных:", error);
            }
         }
        };

        fetchData();
        
    }, [mangaDetails]);

  if (!isData) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>{mangaDetails.title.romaji}</h2>
      <img src={mangaDetails.coverImage.large} alt={mangaDetails.title.romaji} />
      <p>Description: <span dangerouslySetInnerHTML={{ __html: mangaDetails.description }} /></p>
      <p>Genres: {mangaDetails.genres.join(', ')}</p>
      <p>Chapters: {mangaDetails.chapters}</p>

      <Link to={`/manga/read/${mangaDetails.title.romaji.replace(/\s+/g, '-')}/${mangaDetails.id}`}>
        <button>Читать</button>
      </Link>
    </div>
  );
};

export default MangaDetails;

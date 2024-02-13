import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import './read.css'
export default function MangaReadPage() {
    const { id } = useParams();
    let chapter = 1;
    let number = 1;
    const [mangaDetails, setMangaDetails] = useState(false);
    const [imageUrlsList, setImageUrlsList] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post('https://graphql.anilist.co/graphql', {
                    query: `
                        query {
                            Media(id: ${id}, type: MANGA) {
                                id
                                title {
                                    romaji
                                }
                            }
                        }
                    `,
                });
                setMangaDetails(response.data.data.Media);
                console.log("data");
            } catch (error) {
                console.error('Error fetching manga details:', error);
            }
        };

        fetchData();
    }, [id]);

    useEffect(() => {
        const fetchDataForRead = async () => {
            if (mangaDetails) {
                try {
                    const response = await axios.get(`http://127.0.0.1:5000/api/get_data/for_read/${mangaDetails.title.romaji.replace(/\s+/g, '-')}/c=${chapter}/page=${number}`, { headers: { 'Access-Control-Allow-Origin': '*' } });
                    setImageUrlsList(response.data);
                    console.log(response.data);
                } catch (error) {
                    console.error("Ошибка при запросе данных:", error);
                }
            }
        };

        fetchDataForRead();
    }, [mangaDetails, chapter, number]);

    return (
        <div className="read_window">
            {imageUrlsList.length > 0 ? (
                imageUrlsList.map((url, index) => (
                    <img key={index} src={url} alt="" />
                ))
                ) : (
                <p>Loading...</p>
                )}
        </div>
    );
}

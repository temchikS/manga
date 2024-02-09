import React from 'react';
import MangaCell from './mangacell';
import './mangagrid.css';

const MangaGrid = ({ mangaData }) => {
  return (
    <div className="manga-grid">
      {mangaData.map((manga, index) => (
        <MangaCell key={index} imageUrl={manga.imageUrl} title={manga.title} />
      ))}
    </div>
  );
};

export default MangaGrid;

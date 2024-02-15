import React from 'react';


const MangaCell = ({ imageUrl, title }) => {
  return (
    <div className="manga-cell">
      <img src={imageUrl} alt={title} />
      <p>{title}</p>
    </div>
  );
};

export default MangaCell;

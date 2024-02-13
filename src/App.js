import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MangaReader from './components/MangaReader';
import MangaDetails from './components/MangaDetails';
import MangaReadPage from './components/MangaReadPage';
const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<MangaReader />} />
        <Route path="/manga/:title/:id" element={<MangaDetails />} />
        <Route path="/manga/read/:title/:id" element={<MangaReadPage />} />
      </Routes>
    </>
  );
}

export default App;

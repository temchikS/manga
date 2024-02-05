import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MangaReader from './components/MangaReader';
import MangaDetails from './components/MangaDetails';

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<MangaReader />} />
        <Route path="/manga/:id" element={<MangaDetails />} />
      </Routes>
    </>
  );
}

export default App;

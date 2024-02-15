import React, { useEffect, useState } from 'react';
import Header from './hedfot/header';
import Footer from './hedfot/footer';
import MangaTop from './mangainfolist/mangatop'


const MangaMainPage = () => {
  return (
    <div>
      <Header />
      <MangaTop />
      {/* <MangaGrid mangaData={mangaData} /> */}
     <Footer/>
    </div>
  );
};
export default MangaMainPage;
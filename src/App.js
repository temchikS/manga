import React from 'react';
import './App.css';
import Header from './hedfot/header';
import Footer from './hedfot/footer';
// import MangaGrid from './mangacell/mangagrid'
import SearchBar from './search/search';
import MangaTop from './mangainfolist/mangatop'


// const mangaData = [
//   { title: 'Берсерк', imageUrl: 'berserk.jpg' },
//   { title: 'ДЖОДЖО 3', imageUrl: 'jojosbizarreadventures.jpg' },
//   { title: 'Chapter 3', imageUrl: 'path_to_image_3.jpg' },
//   { title: 'Chapter 4', imageUrl: 'path_to_image_4.jpg' },
//   { title: 'Chapter 5', imageUrl: 'path_to_image_5.jpg' },
//   { title: 'Chapter 6', imageUrl: 'path_to_image_6.jpg' },
//   { title: 'Chapter 7', imageUrl: 'path_to_image_7.jpg' },
//   { title: 'Chapter 8', imageUrl: 'path_to_image_8.jpg' },
//   { title: 'Chapter 4', imageUrl: 'path_to_image_4.jpg' },
//   { title: 'Chapter 5', imageUrl: 'path_to_image_5.jpg' },
//   { title: 'bacuman', imageUrl: 'bacuman.jpg' },
//   { title: 'Chapter 7', imageUrl: 'path_to_image_7.jpg' },
//   { title: 'Death Note', imageUrl: 'deadnote.jpg' },
//   // Добавьте другие данные манги по мере необходимости
// ];
function App() {
  return (
    <div className="App">
      <SearchBar/>
      <Header />
      <MangaTop />
      
      {/* <MangaGrid mangaData={mangaData} /> */}
     <Footer/>
    </div>
  );
}


export default App;

import { useEffect, useState } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import HamburgerMenuPopup from '../HamburgerMenuPopup/HamburgerMenuPopup'
import { arrMoviesCards, savedCards } from '../../utils/data';
import './App.css';

function App() {

  const location = useLocation();
  const [isHamburgerMenuPopupOpen, setIsHamburgerMenuPopupOpen] = useState(false);
  const [width, setWidth] = useState(document.documentElement.clientWidth);

  const headerMenuItems = [
    { name: 'Фильмы', url: '/movies' },
    { name: 'Сохранённые фильмы', url: '/saved-movies' },
  ];

  const hamburgerMenuItems = [
    { name: 'Главная', url: '/' },
    { name: 'Фильмы', url: '/movies' },
    { name: 'Сохранённые фильмы', url: '/saved-movies' },
  ];

  const pathArr01 = [
    "/movies",
    "/saved-movies",
    "/profile",
  ]

  const pathArr02 = [
    "/movies",
    "/saved-movies",
    "/",
  ]

  const pathForFooter = pathArr02.find((item) => {
    return item === location.pathname;
  })

  const pathForHeader = pathArr01.find((item) => {
    return item === location.pathname;
  })

  useEffect(() => {
    setWidth(document.documentElement.clientWidth);

    function handleResize() {
      setWidth(document.documentElement.clientWidth);
    }

    function wait() {
      let timeoutId;
      return function () {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(handleResize, 2000);
      }
    }

    window.addEventListener('resize', wait());

    return () => window.removeEventListener('resize', wait());

  }, [width],);

  function handleHamburgerMenuClick() {
    setIsHamburgerMenuPopupOpen(true);
  }

  function closeAllPopups() {
    setIsHamburgerMenuPopupOpen(false);
  }

  return (
    <>
      <Header menuItems={headerMenuItems} path={pathForHeader} width={width} onHamburgerMenuClick={handleHamburgerMenuClick} />
      <main>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/movies" element={<Movies cards={arrMoviesCards} width={width} />} />
          <Route path="/saved-movies" element={<SavedMovies cards={savedCards} />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/signin" element={<Login />} />
          <Route path="/signup" element={<Register />} />
          <Route path='/404' element={<NotFoundPage />} />
          <Route path="*" element={<Navigate to='/404' replace />} />
        </Routes>
        <HamburgerMenuPopup isOpen={isHamburgerMenuPopupOpen} onClose={closeAllPopups} menuItems={hamburgerMenuItems}></HamburgerMenuPopup>
      </main>
      <Footer path={pathForFooter} />
      <></>
    </>
  );
}

export default App;



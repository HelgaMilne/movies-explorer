import { useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
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

  const menuItems = [
    { name: 'Фильмы', url: '/movies' },
    { name: 'Сохранённые фильмы', url: '/saved-movies' },
  ];

  const hamburgerMenuItems = [
    { name: 'Главная', url: '/' },
    { name: 'Фильмы', url: '/movies' },
    { name: 'Сохранённые фильмы', url: '/saved-movies' },
  ];

  const pathArr = [
    "/movies",
    "/saved-movies",
    "/profile",
  ]

  const path = pathArr.find((item) => {
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
      <Header menuItems={menuItems} path={path} width={width} onHamburgerMenuClick={handleHamburgerMenuClick} />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/movies" element={<Movies cards={arrMoviesCards} width={width} />} />
        <Route path="/saved-movies" element={<SavedMovies cards={savedCards} />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/signin" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/*" element={<NotFoundPage />} />
      </Routes>

      <HamburgerMenuPopup isOpen={isHamburgerMenuPopupOpen} onClose={closeAllPopups} menuItems={hamburgerMenuItems}></HamburgerMenuPopup>

      <Footer />
      <></>
    </>
  );
}

export default App;

/*
  <InfoTooltipPopup isOpen={isInfoTooltipPopupOpen} onClose={closeAllPopups} isError={isError} />
  */

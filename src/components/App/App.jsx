import { useEffect, useState } from 'react';
import { Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import mainApi from '../../utils/MainApi.js';
import moviesApi from '../../utils/MoviesApi.js';
import filterMovies from '../../utils/filterMovies.js';
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
import './App.css';

function App() {

  const location = useLocation();
  const navigate = useNavigate();
  const [isHamburgerMenuPopupOpen, setIsHamburgerMenuPopupOpen] = useState(false);
  const [width, setWidth] = useState(document.documentElement.clientWidth);
  const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [registerApiMessage, setRegisterApiMessage] = useState('');
  const [loginApiMessage, setLoginApiMessage] = useState('');
  const [profileApiMessage, setProfileApiMessage] = useState('');
  const [allMovies, setAllMovies] = useState([]);
  const [searchData, setSearchData] = useState(lookInLocalStorage());
  const [userMovies, setUserMovies] = useState([]);
  const [filteredUserMovies, setFilteredUserMovies] = useState([]);

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

  const pathForHeader = pathArr01.find((item) => {
    return item === location.pathname;
  })

  const pathForFooter = pathArr02.find((item) => {
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

  useEffect(function () {
    const path = location.pathname;
    mainApi.checkToken()
      .then((userData) => {
        setCurrentUser(userData);
        setLoggedIn(true);
        if (!(path === '/signin' || path === '/signup')) {
          navigate(path);
        }
      })
      .catch((err) => {
        setLoggedIn(false);
        console.log(err);
      });
  }, [loggedIn]);

  useEffect(function () {
    mainApi.getMovies()
      .then((movies) => {
        setUserMovies(movies);
      })
      .catch((err) => {
        console.log(err);
      })
  }, []);

  function lookInLocalStorage() {
    if (localStorage.length === 0) {
      return {
        keyword: '',
        filter: false,
        filteredMovies: [],
      };
    } else {
      return {
        keyword: localStorage.getItem('keyword'),
        filter: localStorage.getItem('filter') === "true" ? true : false,
        filteredMovies: JSON.parse(localStorage.getItem('filteredMovies')),
      }
    }
  }

  function putInLocalStorage(result, options) {
    setSearchData({
      keyword: options.keyword,
      filter: options.filter,
      filteredMovies: result,
    });
    localStorage.setItem('keyword', options.keyword);
    localStorage.setItem('filter', options.filter);
    localStorage.setItem('filteredMovies', JSON.stringify(result));
  }

  function clearLocalStorage() {
    localStorage.removeItem('keyword');
    localStorage.removeItem('filter');
    localStorage.removeItem('filteredMovies');
    console.log(` в хранилище ${localStorage.getItem('filteredMovies')}`)
  }

  function handleRegister(userData) {
    mainApi.register(userData)
      .then((user) => {
        setLoggedIn(true);
        setCurrentUser(user);
        navigate('/movies', { replace: true, })
      })
      .catch((err) => {
        setRegisterApiMessage(err.message);
        console.log(err);
      })
  }

  function handleLogin(userData) {
    mainApi.login(userData)
      .then((user) => {
        setLoggedIn(true);
        setCurrentUser(user);
        navigate('/movies', { replace: true, })
      })
      .catch((err) => {
        setLoginApiMessage(err.message);
        console.log(err);
      })
  }

  function handleUpdateUser(userData) {
    mainApi.editUserProfile(userData)
      .then((user) => {
        setCurrentUser(user);
        setProfileApiMessage('Данные пользователя обновлены!');
      })
      .catch((err) => {
        setProfileApiMessage(err.message);
        console.log(err);
      })
  }

  function handleLogout() {
    mainApi.logout()
      .then(() => {
        setLoggedIn(false);
        setCurrentUser({});
        setUserMovies([]);
        setAllMovies([]);
        setSearchData({
          keyword: '',
          filter: false,
          filteredMovies: [],
        })
        clearLocalStorage();
        navigate('/', { replace: true, })
      })
      .catch((err) => {
        console.log(err);
      })
  }

  function handleGetMovies(options) {
    if (allMovies.length === 0) {
      moviesApi.getMovies()
        .then((data) => {
          putInLocalStorage(filterMovies(data, options), options)
          setAllMovies(data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      putInLocalStorage(filterMovies(allMovies, options), options)
    }
  }

  function handleFilterUserMovies(options) {
    setFilteredUserMovies(filterMovies(userMovies, options));
  }

  function handleLikeMovie(movieData, isLiked) {
    if (isLiked) {
      console.log("сохраняю фильм");
      mainApi.addMovie(movieData)
        .then((movie) => {
          setUserMovies([...userMovies, movie]);
        })
        .catch((err) => {
          console.log(err);
        })
    } else {
      if (userMovies.length !== 0) {
        const removedMovie = userMovies.find((item) => {
          return item.id === movieData.id;
        });
        handleRemoveMovie(removedMovie._id)
      }
    }
  }

  function handleRemoveMovie(movieData) {
    console.log("удаляю фильм");;
    mainApi.deleteMovie(movieData)
      .then((movie) => {
        const newUserMovies = userMovies.filter((item) => {
          return (item._id !== movie._id);
        })
        setUserMovies(newUserMovies);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  function handleClearApiMessage() {
    setRegisterApiMessage('');
    setLoginApiMessage('');
    setProfileApiMessage('');
  }

  function handleHamburgerMenuClick() {
    setIsHamburgerMenuPopupOpen(true);
  }

  function closeAllPopups() {
    setIsHamburgerMenuPopupOpen(false);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header menuItems={headerMenuItems} path={pathForHeader} width={width} onHamburgerMenuClick={handleHamburgerMenuClick} loggedIn={loggedIn} />
      <main>
        <Routes>
          <Route path="/movies" element={<ProtectedRoute
            element={Movies}
            movies={searchData.filteredMovies}
            savedMovies={userMovies}
            keyword={searchData.keyword}
            filter={searchData.filter}
            onGetMovies={handleGetMovies}
            onClickMovie={handleLikeMovie}
            width={width}
            loggedIn={loggedIn}
          />} />
          <Route path="/saved-movies" element={<ProtectedRoute
            element={SavedMovies}
            savedMovies={userMovies}
            filteredMovies={filteredUserMovies}
            onGetMovies={handleFilterUserMovies}
            onClickMovie={handleRemoveMovie}
            width={width}
            loggedIn={loggedIn}
          />} />
          <Route path="/profile" element={<ProtectedRoute
            element={Profile}
            onUpdate={handleUpdateUser}
            onLogout={handleLogout}
            onClearApiMessage={handleClearApiMessage}
            apiMessage={profileApiMessage}
            location={location}
            loggedIn={loggedIn}
          />} />
          <Route path="/" element={<Main />} />
          <Route path="/signin" element={<Login
            onLogin={handleLogin}
            apiMessage={loginApiMessage}
            onClearApiMessage={handleClearApiMessage}
            location={location}
          />} />
          <Route path="/signup" element={<Register
            onRegister={handleRegister}
            apiMessage={registerApiMessage}
            onClearApiMessage={handleClearApiMessage}
            location={location}
          />} />
          <Route path='/404' element={<NotFoundPage />} />
          <Route path="*" element={<Navigate to='/404' replace />} />
        </Routes>
        <HamburgerMenuPopup
          isOpen={isHamburgerMenuPopupOpen}
          onClose={closeAllPopups}
          menuItems={hamburgerMenuItems} />
      </main>
      <Footer path={pathForFooter} />
    </CurrentUserContext.Provider>
  );
}

export default App;

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
  const [isLoading, setIsLoading] = useState(false);
  const [registerApiMessage, setRegisterApiMessage] = useState('');
  const [loginApiMessage, setLoginApiMessage] = useState('');
  const [profileApiMessage, setProfileApiMessage] = useState('');
  const [moviesApiMessage, setMoviesApiMessage] = useState('');
  const [userMoviesApiMessage, setUserMoviesApiMessage] = useState('');
  const [searchData, setSearchData] = useState(lookInLocalStorage());
  const [userMovies, setUserMovies] = useState([]);
  const [filteredUserMovies, setFilteredUserMovies] = useState([]);
  const allMovies = JSON.parse(localStorage.getItem('allMovies')) || [];

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
          navigate(path, { replace: true });
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
        setUserMoviesApiMessage('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз.');
        console.log(err);
      });
  }, [loggedIn]);

  useEffect(() => {
    putInLocalStorage(searchData);
  }, [searchData]);

  useEffect(() => {
    setFilteredUserMovies([]);
  }, []);

  function lookInLocalStorage() {
    if (JSON.parse(localStorage.getItem('filteredMovies'))) {
      return {
        keyword: localStorage.getItem('keyword'),
        filter: localStorage.getItem('filter') === "true" ? true : false,
        filteredMovies: JSON.parse(localStorage.getItem('filteredMovies')),
      }
    } else {
      return {
        keyword: '',
        filter: false,
        filteredMovies: [],
      };
    }
  }

  function putInLocalStorage(data) {
    localStorage.setItem('keyword', data.keyword);
    localStorage.setItem('filter', data.filter);
    localStorage.setItem('filteredMovies', JSON.stringify(data.filteredMovies));
  }

  function clearLocalStorage() {
    localStorage.removeItem('keyword');
    localStorage.removeItem('filter');
    localStorage.removeItem('filteredMovies');
    localStorage.removeItem('allMovies');
  }

  function handleRegister(userData) {
    mainApi.register(userData)
      .then((user) => {
        setLoggedIn(true);
        setCurrentUser(user);
        navigate('/movies', { replace: true, })
      })
      .catch((err) => {
        if (err.status === 400) {
          setRegisterApiMessage('Вы ввели некорректные данные!');
        } else if (err.status === 409) {
          setRegisterApiMessage('Пользователь с таким email уже существует!');
        } else {
          setRegisterApiMessage('При регистрации пользователя произошла ошибка.');
        }
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
        if (err.status === 400 || err.status === 401) {
          setLoginApiMessage('Вы ввели неправильный логин или пароль!');
        } else {
          setLoginApiMessage('При авторизации произошла ошибка. Переданный токен некорректен.');
        }
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
        if (err.status === 400) {
          setProfileApiMessage('Вы ввели некорректные данные!');
        } else if (err.status === 409) {
          setProfileApiMessage('Пользователь с таким email уже существует!');
        } else {
          setProfileApiMessage('При обновлении профиля произошла ошибка!');
        }
        console.log(err);
      })
  }

  function handleLogout() {
    mainApi.logout()
      .then(() => {
        setLoggedIn(false);
        setCurrentUser({});
        setUserMovies([]);
        setSearchData({
          keyword: '',
          filter: false,
          filteredMovies: [],
        })
        clearLocalStorage();
        handleClearApiMessage();
        navigate('/', { replace: true, })
      })
      .catch((err) => {
        console.log(err);
      })
  }

  function handleGetMovies(options) {
    console.log('будем искать');
    if (allMovies.length === 0) {
      console.log('обращаюсь к большому API');
      setIsLoading(true);
      moviesApi.getMovies()
        .then((data) => {
          localStorage.setItem('allMovies', JSON.stringify(data));
          const filteredMovies = filterMovies(data, options)
          setSearchData({
            keyword: options.keyword,
            filter: options.filter,
            filteredMovies: filteredMovies,
          });
          if (filteredMovies.length === 0) {
            setMoviesApiMessage('Ничего не найдено');
          } else {
            setMoviesApiMessage('');
          }
        })
        .catch((err) => {
          setMoviesApiMessage('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз.');
          console.log(err);
        })
        .finally(() => {
          setTimeout(() => setIsLoading(false), 2000);
        });
    } else {
      console.log('обращаюсь к хранилищу');
      const filteredMovies = filterMovies(allMovies, options)
      setSearchData({
        keyword: options.keyword,
        filter: options.filter,
        filteredMovies: filteredMovies,
      });
      if (filteredMovies.length === 0) {
        setMoviesApiMessage('Ничего не найдено!');
      } else {
        setMoviesApiMessage('');
      }
    }
  }

  function handleFilterUserMovies(options) {
    const filteredMovies = filterMovies(userMovies, options);
    setFilteredUserMovies(filteredMovies);
    if (filteredMovies.length === 0) {
      setUserMoviesApiMessage('Ничего не найдено!');
    } else {
      setUserMoviesApiMessage('');
    }
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
    console.log("удаляю фильм");

    mainApi.deleteMovie(movieData)
      .then((movie) => {
        const newUserMovies = userMovies.filter((item) => {
          return (item._id !== movie._id);
        })
        setUserMovies(newUserMovies);
        const newFilteredUserMovies = filteredUserMovies.filter((item) => {
          return (item._id !== movie._id);
        })
        setFilteredUserMovies(newFilteredUserMovies);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  function handleClearApiMessage() {
    setRegisterApiMessage('');
    setLoginApiMessage('');
    setProfileApiMessage('');
    setMoviesApiMessage('');
    setUserMoviesApiMessage('');
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
      <main className="main">
        <Routes>
          <Route path="/movies" element={<ProtectedRoute
            element={Movies}
            movies={searchData.filteredMovies}
            savedMovies={userMovies}
            keyword={searchData.keyword}
            filter={searchData.filter}
            onGetMovies={handleGetMovies}
            onClickMovie={handleLikeMovie}
            apiMessage={moviesApiMessage}
            onClearApiMessage={handleClearApiMessage}
            isLoading={isLoading}
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
            apiMessage={userMoviesApiMessage}
            onClearApiMessage={handleClearApiMessage}
            isLoading={isLoading}
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

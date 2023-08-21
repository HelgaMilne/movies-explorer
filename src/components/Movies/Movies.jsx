import React from 'react';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import InfoApi from '../InfoApi/InfoApi';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import './Movies.css';

function Movies({ movies, keyword, filter, width, onGetMovies, onClickMovie }) {

    const currentUser = React.useContext(CurrentUserContext);
    const onloaded = true;
    const message = 'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз.';

    return (
        <section className="movies">
            <SearchForm keyword={keyword} filter={filter} onGetMovies={onGetMovies} />
            <Preloader onloaded={onloaded} />
            <span className="movies__message movies__message_hidden">{message}</span>
            <MoviesCardList movies={movies} width={width} onClickMovie={onClickMovie} isSavedMovie={false} />
        </section>
    );
}

export default Movies;

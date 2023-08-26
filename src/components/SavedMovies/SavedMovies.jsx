import { useState, useEffect } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import InfoMoviesApi from '../InfoMoviesApi/InfoMoviesApi';
import Preloader from '../Preloader/Preloader';
import './SavedMovies.css';

function SavedMovies({
    savedMovies,
    filteredMovies,
    onGetMovies,
    onClickMovie,
    apiMessage,
    onClearApiMessage,
    isLoading }) {

    const [moviesForRender, setMoviesForRender] = useState([]);

    useEffect(() => {
        onClearApiMessage();
    }, []);

    useEffect(() => {
        const movies = filteredMovies.length !== 0 ? filteredMovies : savedMovies;
        setMoviesForRender(movies);
    }, [savedMovies, filteredMovies]);

    return (
        <section className="saved-movies">
            <SearchForm onGetMovies={onGetMovies} isSavedMovies={true} />
            {
                isLoading ? <Preloader />
                    : apiMessage ? <InfoMoviesApi message={apiMessage} />
                        : <MoviesCardList movies={moviesForRender} onClickMovie={onClickMovie} isSavedMovies={true} />
            }
        </section>
    );
}

export default SavedMovies;

import { useEffect } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import InfoMoviesApi from '../InfoMoviesApi/InfoMoviesApi';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import './Movies.css';

function Movies({
    movies,
    savedMovies,
    keyword,
    filter,
    width,
    onGetMovies,
    onClickMovie,
    apiMessage,
    onClearApiMessage,
    isLoading }) {

    const handingMovies = movies.map((item01) => {
        if (savedMovies.length !== 0) {
            item01.isLiked = savedMovies.some((item02) => {
                return (item02.movieId === item01.id);
            });
        } else {
            item01.isLiked = false;
        }
        return item01;
    });

    useEffect(() => {
        onClearApiMessage();
    }, []);

    return (
        <section className="movies">
            <SearchForm
                keyword={keyword}
                filter={filter}
                onGetMovies={onGetMovies}
                isSavedMovies={false}
            />
            {
                isLoading ? <Preloader />
                    : apiMessage ? <InfoMoviesApi message={apiMessage} />
                        : <MoviesCardList movies={handingMovies} width={width} onClickMovie={onClickMovie} isSavedMovies={false} />
            }
        </section>
    );
}

export default Movies;

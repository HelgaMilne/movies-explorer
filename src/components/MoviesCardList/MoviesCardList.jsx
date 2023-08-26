import { useState, useEffect } from 'react';
import MovieCard from '../MovieCard/MovieCard';
import './MoviesCardList.css';
import {
    BREAKPOINT_01,
    BREAKPOINT_02,
    NUMBER_OF_MOVIES_MOBILE_SCREEN,
    NUMBER_OF_MOVIES_TABLET_SCREEN,
    NUMBER_OF_MOVIES_DESKTOP_SCREEN,
    DELTA_TABLET_MOBILE_SCREEN,
    DELTA_DESKTOP_SCREEN,
} from '../../utils/config.js';

function MoviesCardList({ movies, width, onClickMovie, isSavedMovies }) {

    function getDelta() {
        if (width >= BREAKPOINT_01) {
            return DELTA_DESKTOP_SCREEN;
        } else if (width < BREAKPOINT_01) {
            return DELTA_TABLET_MOBILE_SCREEN;
        }
    }

    function getIndex() {
        if (width >= BREAKPOINT_01) {
            return NUMBER_OF_MOVIES_DESKTOP_SCREEN;
        } else if (width < BREAKPOINT_01 && width >= BREAKPOINT_02) {
            return NUMBER_OF_MOVIES_TABLET_SCREEN;
        } else {
            return NUMBER_OF_MOVIES_MOBILE_SCREEN;
        }
    }

    const [delta, setDelta] = useState(getDelta());
    const [movieIndex, setMovieIndex] = useState(getIndex());
    const [moviesForRender, setMoviesForRender] = useState([]);

    useEffect(() => {
        setDelta(getDelta());
        setMovieIndex(getIndex());
    }, [width]);

    useEffect(() => {
        setDelta(getDelta());
        setMovieIndex(getIndex());
    }, [movies]);

    useEffect(() => {
        const firstMovies = movies.slice(0, movieIndex);
        setMoviesForRender(firstMovies);
    }, [movies, delta, movieIndex]);

    function handleClick() {
        const nextMovies = movies.slice(movieIndex, (movieIndex + delta));
        setMoviesForRender([...moviesForRender, ...nextMovies]);
        setMovieIndex(movieIndex + delta);
    }

    if (isSavedMovies) {
        return (
            <div className="movies-card-list">
                <ul className="movies-card-list__container">
                    {
                        movies.map((movie) => {
                            return (
                                <MovieCard movie={movie} key={movie.id || movie._id} onClickMovie={onClickMovie} isSavedMovies={isSavedMovies} />
                            );
                        })
                    }
                </ul>
            </div>
        );
    } else {
        return (
            <div className="movies-card-list">
                <ul className="movies-card-list__container">
                    {
                        moviesForRender.map((movie) => {
                            return (
                                <MovieCard movie={movie} key={movie.id || movie._id} onClickMovie={onClickMovie} isSavedMovies={isSavedMovies} />
                            );
                        })
                    }
                </ul>
                {
                    (movies.length + 1) > (movieIndex + 1) &&
                    <button className="movies-card-list__more-button" onClick={handleClick}>Ещё</button>
                }
            </div>
        );
    }
}

export default MoviesCardList;

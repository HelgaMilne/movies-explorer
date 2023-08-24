import { useState, useEffect } from 'react';
import MovieCard from '../MovieCard/MovieCard';
import './MoviesCardList.css';

function MoviesCardList({ movies, width, onClickMovie, isSavedMovies }) {

    function getDelta() {
        return width >= 880 ? 3 : width <= 879 && width >= 604 ? 2 : 1;
    }

    function getIndex() {
        return (delta === 3 || delta === 2) ? delta * 4 : delta * 5;
    }

    const [delta, setDelta] = useState(getDelta());
    const [movieIndex, setMovieIndex] = useState(getIndex());
    const [moviesForRender, setMoviesForRender] = useState([]);

    useEffect(() => {
        setDelta(getDelta());
        setMovieIndex(getIndex());
    }, [width]);

    useEffect(() => {
        const firstMovies = movies.slice(0, movieIndex);
        setMoviesForRender(firstMovies);
    }, [movies]);

    function handleClick() {
        if (width >= 646) {
            const nextMovies = movies.slice(movieIndex, (movieIndex + delta));
            setMoviesForRender([...moviesForRender, ...nextMovies]);
            setMovieIndex(movieIndex + delta);
        } else {
            const nextMovies = movies.slice(movieIndex, (movieIndex + delta + 1));
            setMoviesForRender([...moviesForRender, ...nextMovies]);
            setMovieIndex(movieIndex + delta + 1);
        }
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

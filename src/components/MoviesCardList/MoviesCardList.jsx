import { useState, useEffect } from 'react';
import MovieCard from '../MovieCard/MovieCard';
import './MoviesCardList.css';

function MoviesCardList({ movies, width, onClickMovie, isSavedMovie }) {

    // узнаем, сколько карточек должно быть в ряду
    function getDelta() {
        return width >= 880 ? 3 : width <= 879 && width >= 604 ? 2 : 1;
    }

    // узнаем, по какой индекс должны рендериться карточки
    function getIndex() {
        return (delta === 3 || delta === 2) ? delta * 4 : delta * 5;
    }

    const [delta, setDelta] = useState(getDelta());
    const [movieIndex, setMovieIndex] = useState(getIndex());
    // первая порция карточек для отображения
    const firstMovies = movies.slice(0, movieIndex);
    const [moviesForRender, setMoviesForRender] = useState(firstMovies);

    // если ширина экрана поменяется, обновить количество карточек в ряду и индекс
    useEffect(() => {
        setDelta(getDelta());
        setMovieIndex(getIndex());
    }, [width]);

    // высчитываем новую порцию карточек для отображения
    function handleClick() {
        const nextMovies = width >= 646 ? movies.slice(movieIndex, (movieIndex + delta)) : movies.slice(movieIndex, (movieIndex + delta + 1));
        setMoviesForRender([...moviesForRender, ...nextMovies]);
        setMovieIndex(movieIndex + delta);
    }

    return (
        <div className="movies-card-list">
            <ul className="movies-card-list__container">
                {
                    movies.map((movie) => {
                        return (
                            <MovieCard movie={movie} key={movie.id || movie._id} onClickMovie={onClickMovie} isSavedMovie={isSavedMovie} />
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

export default MoviesCardList;

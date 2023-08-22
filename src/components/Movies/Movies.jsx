import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import InfoApi from '../InfoApi/InfoApi';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import './Movies.css';

function Movies({ movies, savedMovies, keyword, filter, width, onGetMovies, onClickMovie }) {

    const onloaded = true;
    const message = 'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз.';

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

    return (
        <section className="movies">
            <SearchForm keyword={keyword} filter={filter} onGetMovies={onGetMovies}  isSavedMovies={false} />
            <Preloader onloaded={onloaded} />              
            <span className="movies__message movies__message_hidden">{message}</span>
            <MoviesCardList movies={handingMovies} width={width} onClickMovie={onClickMovie} isSavedMovies={false} />
        </section>
    );
}

export default Movies;

/*

*/
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import './SavedMovies.css';

function SavedMovies({ movies, onGetMovies, onClickMovie }) {

    return (
        <section className="saved-movies">
            <SearchForm onGetMovies={onGetMovies} />
            <MoviesCardList movies={movies} onClickMovie={onClickMovie} isSavedMovie={true} />
        </section>
    );
}

export default SavedMovies;

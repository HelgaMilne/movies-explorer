import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import './SavedMovies.css';

function SavedMovies({ savedMovies, filteredMovies, onGetMovies, onClickMovie }) {

    const movies = filteredMovies.length !== 0 ? filteredMovies : savedMovies;

    return (
        <section className="saved-movies">
            <SearchForm onGetMovies={onGetMovies} isSavedMovies={true} />
            <MoviesCardList movies={movies} onClickMovie={onClickMovie} isSavedMovies={true} />
        </section>
    );
}

export default SavedMovies;

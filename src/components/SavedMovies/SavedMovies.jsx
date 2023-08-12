import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import './SavedMovies.css';

function SavedMovies({ cards }) {

    return (
        <section className="saved-movies">
            <SearchForm />
            <MoviesCardList cards={cards} />
        </section>
    );
}

export default SavedMovies;

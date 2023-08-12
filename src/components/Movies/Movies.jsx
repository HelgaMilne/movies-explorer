import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import './Movies.css';

function Movies({ cards, width }) {

    const onloaded = true;
    const message = 'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз.';

    return (
        <section className="movies">
            <SearchForm />
            <Preloader onloaded={onloaded} />
            <span className="movies__message movies__message_hidden">{message}</span>
            <MoviesCardList cards={cards} width={width} />
        </section>
    );
}

export default Movies;

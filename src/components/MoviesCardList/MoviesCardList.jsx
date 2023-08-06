import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';

function MoviesCardList({ cards, width }) {

       return (
        <div className="movies-card-list">
            <ul className="movies-card-list__container">
                {
                    cards.map((card) => {
                        return (
                            <MoviesCard card={card} key={card._id}/>
                        );
                    })
                }
            </ul>
            {
                cards.length > 12 &&
                <button className="movies-card-list__more-button">Ещё</button>
            }

        </div>
    );
}

export default MoviesCardList;

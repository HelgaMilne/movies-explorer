import './MoviesCard.css';

function MoviesCard({ card }) {

    const button = card.saved ?
        <button className="movies-card__save-button movies-card__save-button_remove" type="button" ></button>
        : <button className={`movies-card__save-button ${card.liked ? 'movies-card__save-button_active' : ''}`} type="button" >{card.liked ? '' : 'Сохранить'}</button>;

    return (
        <li className="movies-card">
            <div className="movies-card__info">
                <h4 className="movies-card__caption">{card.name}</h4>
                <span className="movies-card__duration">{card.duration}&nbsp;минут</span>
            </div>
            <img className="movies-card__image" src={card.image} alt={`Кадр из фильма '${card.name}'`} />
            {button}
        </li>
    );
}

export default MoviesCard;

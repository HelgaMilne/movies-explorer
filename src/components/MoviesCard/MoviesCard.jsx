import { Link } from 'react-router-dom';
import './MoviesCard.css';

function MoviesCard({ card }) {

    const imageUrl = `https://api.nomoreparties.co${card.image.url}`;
    const trailerLink = card.trailerLink;
    const duration = card.duration <= 60 ?
        `${card.duration} минут` :
        Math.floor(card.duration / 60) >= 1 && Math.floor(card.duration / 60) < 2 ?
            `${Math.floor(card.duration / 60)} час ${card.duration % 60} мин.` :
            `${Math.floor(card.duration / 60)} часа ${card.duration % 60} мин.`;

    const button = true ?
        <button className="movies-card__save-button movies-card__save-button_remove" type="button" onClick={handleRemove}></button>
        : <button className={`movies - card__save - button ${card.liked ? 'movies-card__save-button_active' : ''} `} type="button" >{card.liked ? '' : 'Сохранить'}</button>;

    function handleRemove() {
        console.log('УРА');
    }



    return (
        <li className="movies-card">
            <div className="movies-card__info">
                <h4 className="movies-card__caption">{card.nameRU}</h4>
                <span className="movies-card__duration">{duration}</span>
            </div>
            <a href={trailerLink} target="_blank" rel="noopener noreferrer">
                <img className="movies-card__image" src={imageUrl} alt={`Кадр из фильма '${card.nameRU}'`} />
            </a>
            {button}
        </li>
    );
}

export default MoviesCard;

import { useEffect, useState, useContext } from 'react';
import './MovieCard.css';

function MovieCard({ movie, onClickMovie, isSavedMovie }) {

    const [isLiked, setIsLiked] = useState(false);
    const imageUrl = isSavedMovie ? movie.image : `https://api.nomoreparties.co${movie.image.url}`;
    const thumbnailUrl = isSavedMovie ? movie.thumbnail : `https://api.nomoreparties.co${movie.image.formats.thumbnail.url}`;
    const trailerLink = movie.trailerLink;
    const duration = movie.duration <= 60 ?
        `${movie.duration} минут` :
        Math.floor(movie.duration / 60) >= 1 && Math.floor(movie.duration / 60) < 2 ?
            `${Math.floor(movie.duration / 60)} час ${movie.duration % 60} мин.` :
            `${Math.floor(movie.duration / 60)} часа ${movie.duration % 60} мин.`;

    const button = isSavedMovie ?
        <button className="movies-card__save-button movies-card__save-button_remove" type="button" onClick={handleClick}></button>
        : <button className={`movies-card__save-button ${isLiked ? 'movies-card__save-button_active' : ''} `} type="button" onClick={handleClick} >{isLiked ? '' : 'Сохранить'}</button>;

    const movieData = isSavedMovie ? movie._id
        : {
            movieId: movie.id,
            country: movie.country,
            director: movie.director,
            duration: movie.duration,
            year: movie.year,
            description: movie.description,
            image: imageUrl,
            trailerLink: movie.trailerLink,
            thumbnail: thumbnailUrl,
            nameRU: movie.nameRU,
            nameEN: movie.nameEN,
        };

    function handleClick() {
        onClickMovie(movieData);
        setIsLiked(!isLiked);
    }

    return (
        <li className="movies-card">
            <div className="movies-card__info">
                <h4 className="movies-card__caption">{movie.nameRU}</h4>
                <span className="movies-card__duration">{duration}</span>
            </div>
            <a href={trailerLink} target="_blank" rel="noopener noreferrer">
                <img className="movies-card__image" src={imageUrl} alt={`Кадр из фильма '${movie.nameRU}'`} />
            </a>
            {button}
        </li>
    );
}

export default MovieCard;

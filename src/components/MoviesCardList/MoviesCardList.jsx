import { useEffect, useState } from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';

function MoviesCardList({ cards, width }) {

    // узнаем, сколько карточек должно быть в ряду
    function getDelta() {
        return width >= 880 ? 3 : width <= 879 && width >= 604 ? 2 : 1;
    }

    // узнаем, по какой индекс должны рендериться карточки
    function getIndex() {
        return (delta === 3 || delta === 2) ? delta * 4 : delta * 5;
    }

    const [delta, setDelta] = useState(getDelta());
    const [cardIndex, setCardIndex] = useState(getIndex());
    // первая порция карточек для отображения
    const firstCards = cards.slice(0, cardIndex);
    const [cardsForRender, setCardsForRender] = useState(firstCards);

    // если ширина экрана поменяется, обновить количество карточек в ряду и индекс
    useEffect(() => {
        setDelta(getDelta());
        setCardIndex(getIndex());
    }, [width]);

    // высчитываем новую порцию карточек для отображения
    function handleClick() {
        const nextCards = width >= 646 ? cards.slice(cardIndex, (cardIndex + delta)) : cards.slice(cardIndex, (cardIndex + delta + 1));
        setCardsForRender([...cardsForRender, ...nextCards]);
        setCardIndex(cardIndex + delta);
    }

    return (
        <div className="movies-card-list">
            <ul className="movies-card-list__container">
                {
                    cardsForRender.map((card) => {
                        return (
                            <MoviesCard card={card} key={card._id} />
                        );
                    })
                }
            </ul>
            {
                (cards.length + 1) > (cardIndex + 1) &&
                <button className="movies-card-list__more-button" onClick={handleClick}>Ещё</button>
            }
        </div>
    );
}

export default MoviesCardList;

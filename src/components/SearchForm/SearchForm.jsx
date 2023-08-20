import { useState } from 'react';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import './SearchForm.css';

function SearchForm({ keyword, filter, onGetMovies }) {

    const [isValid, setIsValid] = useState(true);
    const [isCheckBoxActive, setIsCheckBoxActive] = useState(filter === true ? true : false);
    const [value, setValue] = useState(keyword || '');
    const [errorMessage, setErrorMessage] = useState('');

    function handleChange(event) {
        if (event.target.validity.patternMismatch) {
            setErrorMessage('Допускаются только латиница или кириллица');
        } else if (!event.target.validity.valid) {
            setErrorMessage('Нужно ввести ключевое слово');
        } else {
            setErrorMessage('');
        }
        setValue(event.target.value);
        setIsValid(event.target.validity.valid);
    }

    function changeFilterState(state) {
        setIsCheckBoxActive(state);
        /*
        if (filter !== undefined && isValid) {
            onGetMovies({
                keyword: value,
                filter: isCheckBoxActive,
            });
        }
        */
    }

    function onSubmit(event) {
        event.preventDefault();
        onGetMovies({
            keyword: value,
            filter: isCheckBoxActive,
        });
    }

    return (
        <form className="search-form" name="search-form" onSubmit={onSubmit} noValidate>
            <span className="search-form__container">
                <input className="search-form__input" name="keyword" type="text" pattern="[A-Za-zА-Яа-яЁё0-9\s]+" value={value} placeholder='Фильм' onChange={handleChange}
                    maxLength="40" required></input>
                <button className="search-form__button" type="submit" disabled={!isValid} ></button>
            </span>
            <span className={`search-form__input-error ${isValid ? '' : 'search-form__input-error_active'} `}>{errorMessage} </span>
            <FilterCheckbox changeFilterState={changeFilterState} startFilterState={filter} />
        </form>
    );
}

export default SearchForm;

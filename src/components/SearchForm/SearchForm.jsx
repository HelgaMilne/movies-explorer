import React from 'react';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import './SearchForm.css';

function SearchForm() {

    function onSubmit() {
        console.log('test');
    }

    return (
        <form className="search-form" name="search-form" onSubmit={onSubmit} noValidate>
            <span className="search-form__container">
                <textarea className="search-form__textarea" name="film" placeholder='Фильм' rows="1"></textarea>
                <button className="search-form__button" type="submit" ></button>
            </span>
            <FilterCheckbox />
        </form>
    );
}

export default SearchForm;

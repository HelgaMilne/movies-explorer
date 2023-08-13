import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import './SearchForm.css';

function SearchForm() {

    const errorText = 'Нужно ввести ключевое слово';

    function onSubmit() {
        console.log('test');
    }

    return (
        <form className="search-form" name="search-form" onSubmit={onSubmit}>
            <span className="search-form__container">
                <input className="search-form__input" name="film" placeholder='Фильм' minLength="2"
                    maxLength="200" required></input>
                <button className="search-form__button" type="submit" ></button>
            </span>
            <span className="search-form__input-error search-form__input-error_active">{errorText} </span>
            <FilterCheckbox />
        </form>
    );
}

export default SearchForm;

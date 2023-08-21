import './FilterCheckbox.css';

function FilterCheckbox({ startFilterState, changeFilterState }) {

    function handleClick(event) {
        changeFilterState(event.target.checked);
    }

    return (
        <div className="filter-checkbox">
            <label className="filter-checkbox__label">
                <input className="filter-checkbox__invisible-checkbox" type="checkbox" defaultChecked={startFilterState} onClick={handleClick} />
                <span className='filter-checkbox__visible-checkbox'></span>
                Короткометражки
            </label>
        </div>
    );
}

export default FilterCheckbox;

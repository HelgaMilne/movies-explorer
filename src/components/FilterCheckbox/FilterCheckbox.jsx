import { useState, useCallback } from 'react';
import './FilterCheckbox.css';

function FilterCheckbox({ startFilterState, changeFilterState }) {

    const [isSelected, setIsSelected] = useState(startFilterState);
    const followСhange = useCallback(() => {
        changeFilterState(isSelected);
    }, [isSelected]);

    function handleClick() {
        setIsSelected(!isSelected);
        followСhange();
    }

    return (
        <div className="filter-checkbox">
            <label className="filter-checkbox__label">
                <input className="filter-checkbox__invisible-checkbox" type="checkbox" onClick={handleClick}></input>
                <span className={`filter-checkbox__visible-checkbox ${isSelected ? 'filter-checkbox__visible-checkbox_active' : ''}`}></span>
                Короткометражки
            </label>
        </div>
    );
}

export default FilterCheckbox;

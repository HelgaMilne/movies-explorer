import { useState } from 'react';
import './FilterCheckbox.css';

function FilterCheckbox() {

    const [isSelected, setIsSelected] = useState(false);

    function handleClick() {
        setIsSelected(!isSelected);
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

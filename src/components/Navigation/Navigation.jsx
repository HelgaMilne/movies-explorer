import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navigation.css';

function Navigation({ items }) {

    return (
        <ul className="navigation">
            {
                items.map(item => {
                    return (
                        <li key={item.name}><NavLink className={({ isActive }) => isActive ? "navigation__item navigation__item_active" : "navigation__item"} to={item.url} >{item.name}</NavLink></li>
                    );
                })
            }
        </ul>
    );
}

export default Navigation;

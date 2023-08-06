import React from 'react';
import { Link } from 'react-router-dom';
import './AccountNav.css';

function AccountNav() {

    return (
        <div className="account__nav">
            <Link className="account__link" to="/profile">Аккаунт</Link>
            <span className="account__icon"></span>
        </div>
    );
}

export default AccountNav;

import { Link } from 'react-router-dom';
import './AccountNav.css';

function AccountNav() {

    return (
        <div className="account-nav">
            <Link className="account-nav__link" to="/profile">Аккаунт</Link>
            <span className="account-nav__icon"></span>
        </div>
    );
}

export default AccountNav;

import { Link, useLocation } from 'react-router-dom';
import './AccountNav.css';

function AccountNav() {
    const path = useLocation().pathname;
    const iconClass = path === '/' ? 'account-nav__icon account-nav__icon_promo' : 'account-nav__icon';

    return (
        <div className="account-nav">
            <Link className="account-nav__link" to="/profile">Аккаунт</Link>
            <span className={iconClass}></span>
        </div>
    );
}

export default AccountNav;

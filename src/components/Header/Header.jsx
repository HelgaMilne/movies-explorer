import { Routes, Route, Link } from 'react-router-dom';
import Logo from '../Logo/Logo';
import AccountNav from '../AccountNav/AccountNav';
import Navigation from '../Navigation/Navigation';
import './Header.css';

function Header({ menuItems, path, width, onHamburgerMenuClick }) {
   
    function handleClick() {
        onHamburgerMenuClick();
    }

    return (

        <Routes>

            <Route path='/' element={
                <header className="header header_theme_promo">
                    <Logo />
                    <Link className="header__logo" to="/"></Link>
                    <div className="header__nav">
                        <Link className='header__link' to="/signup">Регистрация</Link>
                        <Link className='header__link' to="/signin"><button className='header__link-button' type="button" >Войти</button></Link>
                    </div>
                </header>
            } />

            <Route path={path} element={
                <header className="header">
                    <Logo />
                    {
                        (width <= 768) ?
                            <button className="header__hamburger-menu-icon" onClick={handleClick}></button>
                            : (<div className="header__nav">
                                <Navigation items={menuItems} />
                                <AccountNav />
                            </div>)
                    }
                </header>
            } />

        </Routes>
    );
}

export default Header;

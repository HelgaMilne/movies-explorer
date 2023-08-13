import Popup from '../Popup/Popup';
import AccountNav from '../AccountNav/AccountNav';
import Navigation from '../Navigation/Navigation';
import './HamburgerMenuPopup.css';

function HamburgerMenuPopup({ menuItems, isOpen, onClose }) {

    return (
        <Popup popupName="hamburger-menu" isOpen={isOpen} onClose={onClose}>
            <div className={`hamburger-menu ${isOpen ? 'hamburger-menu_opened' : ''}`}>
                <Navigation items={menuItems} />
                <AccountNav />
            </div>
        </Popup>
    );
}

export default HamburgerMenuPopup;

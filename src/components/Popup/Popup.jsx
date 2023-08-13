import './Popup.css';

function Popup({ popupName, isOpen, onClose, children }) {

    function handleClick() {
        onClose();
    }

    return (
        <section className={`popup popup_for_${popupName} ${isOpen ? 'popup_opened' : ''}`}>
            <button className="popup__close-button" type="button" onClick={handleClick}></button>
            {children}
        </section>
    );
}

export default Popup;

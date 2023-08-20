import { Link } from 'react-router-dom';
import Logo from '../Logo/Logo';
import InfoApi from '../InfoApi/InfoApi';
import './Form.css';

function Form({
    formTitle,
    formName,
    buttonText,
    formText,
    formLinkText,
    formLink,
    formSubmit,
    isValid,
    message,
    children }) {

    function handleSubmit(event) {
        formSubmit(event);
    }

    return (
        <section className="form-section">
            <Logo alignSelf={true} />
            <h1 className="form-section__title">{formTitle} </h1>
            <form className="form" name={formName} onSubmit={handleSubmit}>
                <div className="form__children-container">
                    {children}
                </div>
                <InfoApi message={message} />
                <button className={`form__submit-button ${isValid ? "" : "form__submit-button_inactive"}`} type="submit" disabled={!isValid} >{buttonText}</button>
            </form>
            <span className="form-section__text">{formText}&nbsp;<Link to={formLink} className="form-section__link" >{formLinkText}</Link></span>
        </section>
    );
}

export default Form;

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../Logo/Logo';
import InfoAuthApi from '../InfoAuthApi/InfoAuthApi';
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
    children,
    isDone }) {

    const [block, setBlock] = useState(false);

    useEffect(() => {
        setBlock(false);
    }, [isDone]);

    function handleSubmit(event) {
        event.preventDefault();
        setBlock(true);
        formSubmit(event);
    }

    return (
        <section className="form-section">
            <Logo alignSelf={true} />
            <h1 className="form-section__title">{formTitle} </h1>
            <form className="form" name={formName} onSubmit={handleSubmit} noValidate>
                <div className="form__children-container">
                    {children}
                </div>
                <InfoAuthApi message={message} />
                <button className={`form__submit-button ${isValid ? "" : "form__submit-button_inactive"}`} type="submit" disabled={block || !isValid} >{buttonText}</button>
            </form>
            <span className="form-section__text">{formText}&nbsp;<Link to={formLink} className="form-section__link" >{formLinkText}</Link></span>
        </section>
    );
}

export default Form;

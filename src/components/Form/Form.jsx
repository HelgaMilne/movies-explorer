import { Link } from 'react-router-dom';
import Logo from '../Logo/Logo';
import './Form.css';

function Form({ formTitle, formName, buttonText, formText, formLinkText, formLink, children }) {

    return (
        <section className="form-section">
            <Logo alignSelf={true} />
            <h1 className="form-section__title">{formTitle} </h1>
            <form className="form" name={formName} >
                <div className="form__children-container">
                    {children}
                </div>
                <button className="form__submit-button" type="submit" >{buttonText}</button>
            </form>
            <span className="form-section__text">{formText}&nbsp;<Link to={formLink} className="form-section__link" >{formLinkText}</Link></span>
        </section>
    );
}

export default Form;

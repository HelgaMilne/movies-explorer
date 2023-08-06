import { Link } from 'react-router-dom';
import Logo from '../Logo/Logo';
import './Form.css';

function Form({ formTitle, formName, buttonText, formText, formLinkText, formLink, children }) {

    return (
        <div className="form__container">
            <Logo alignSelf={true} />
            <h3 className="form__title">{formTitle} </h3>
            <form className="form form_name_login" name={formName} noValidate>
            <div className="form__children-container">
                {children}
                </div>
                <button className="form__submit-button" type="submit" >{buttonText}</button>
            </form>
            <span className="form__text">{formText}&nbsp;<Link to={formLink} className="form__link" >{formLinkText}</Link></span>
        </div>
    );
}

export default Form;

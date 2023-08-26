import { useState, useEffect } from 'react';
import { useForm } from '../../hooks/useForm';
import Form from '../Form/Form';
import './Login.css';

function Login({ onLogin, apiMessage, onClearApiMessage, isDone }) {

    const formTitle = 'Рады видеть!';
    const formName = 'login';
    const buttonText = 'Войти';
    const formText = 'Ещё не зарегистрированы?';
    const formLinkText = 'Регистрация';
    const formLink = '/signup';

    const {
        values,
        errorMessages,
        validationState,
        handleChange,
        resetForm
    } = useForm({});

    const [isValid, setIsValid] = useState(false);
    const errorEmail = errorMessages['email'];
    const errorPassword = errorMessages['password'];

    useEffect(() => {
        resetForm();
        onClearApiMessage();
    }, []);

    useEffect(() => {
        if (values.email && values.password) {
            const state = Object.values(validationState).some((item) => {
                return item === false;
            });
            setIsValid(!state);
        }
    }, [validationState, values]);

    function handleSubmit(event) {
        event.preventDefault();
        onLogin({
            "email": values.email,
            "password": values.password,
        });
    }

    return (
        <section className="login">
            <Form
                formTitle={formTitle} formName={formName} buttonText={buttonText}
                formSubmit={handleSubmit} formText={formText}
                formLinkText={formLinkText} formLink={formLink}
                isValid={isValid} message={apiMessage} isDone={isDone} >

                <label className="form__label">
                    E-mail
                    <input className={`form__input ${isValid ? "" : 'form__input_error'}`} name='email' type='email' onChange={handleChange}
                        placeholder='email' required />
                    <span className={`form__input-error ${isValid ? "" : 'form__input-error_active'}`}>{errorEmail} </span>
                </label>

                <label className="form__label">
                    Пароль
                    <input className={`form__input ${isValid ? "" : 'form__input_error'}`} name='password' type='password' onChange={handleChange}
                        placeholder='паролль' minLength="8" maxLength="40" pattern="[a-zA-Z0-9]{8,40}" required />
                    <span className={`form__input-error ${isValid ? "" : 'form__input-error_active'}`}>{errorPassword} </span>
                </label>

            </Form>
        </section>
    )
}

export default Login;

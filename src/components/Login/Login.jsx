import Form from '../Form/Form';
import './Login.css';

function Login() {

    const formTitle = 'Рады видеть!';
    const formName = 'login';
    const buttonText = 'Войти';
    const errorText = 'Неправильный ввод';
    const formText = 'Ещё не зарегистрированы?';
    const formLinkText = 'Регистрация';
    const formLink = '/signup';

    return (
        <section className="login">
            <Form formTitle={formTitle} formName={formName} buttonText={buttonText} formText={formText} formLinkText={formLinkText} formLink={formLink}>

                <label className="form__label">
                    E-mail
                    <input className="form__input" name='email' type='email' placeholder='email' required />
                    <span className="form__input-error  form__input-error_active">{errorText} </span>
                </label>

                <label className="form__label">
                    Пароль
                    <input className="form__input" name='password' type='password' placeholder='паролль' required />
                    <span className="form__input-error">{errorText} </span>
                </label>

            </Form>
        </section>
    )
}

export default Login;

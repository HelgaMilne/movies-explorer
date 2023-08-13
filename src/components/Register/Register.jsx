import Form from '../Form/Form';
import './Register.css';

function Register() {

  const formTitle = 'Добро пожаловать!';
  const formName = 'register';
  const buttonText = 'Зарегистрироваться';
  const errorText = 'Неправильный ввод';
  const formText = 'Уже зарегистрированы?';
  const formLinkText = 'Войти';
  const formLink = '/signin';

  return (
    <section className="register">
      <Form formTitle={formTitle} formName={formName} buttonText={buttonText} formText={formText} formLinkText={formLinkText} formLink={formLink}>

        <label className="form__label">
          Имя
          <input className="form__input" name='name' type='text' minLength="2"
            maxLength="40" placeholder='имя' required />
          <span className="form__input-error">{errorText} </span>
        </label>

        <label className="form__label">
          E-mail
          <input className="form__input" name='email' type='email' placeholder='email' required />
          <span className="form__input-error">{errorText} </span>
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

export default Register;

import Section from '../Section/Section';
import Form from '../Form/Form';

function Register() {

  const formTitle = 'Добро пожаловать!';
  const formName = 'register';
  const buttonText = 'Зарегистрироваться';
  const errorText = 'Неправильный ввод';
  const formText = 'Уже зарегистрированы?';
  const formLinkText = 'Войти';
  const formLink = '/signin';

  return (
    <Section sectionName="register">
      <Form formTitle={formTitle} formName={formName} buttonText={buttonText} formText={formText} formLinkText={formLinkText} formLink={formLink}>

        <label className="form__label">
          Имя
          <input className="form__input" name='name' type='text' minLength="2"
                        maxLength="40" required />
          <span className="form__input-error">{errorText} </span>
        </label>

        <label className="form__label">
          E-mail
          <input className="form__input" name='email' type='email' required />
          <span className="form__input-error">{errorText} </span>
        </label>

        <label className="form__label">
          Пароль
          <input className="form__input" name='password' type='password'  required />
          <span className="form__input-error">{errorText} </span>
        </label>

      </Form>
    </Section>
  )
}

export default Register;

import { useState, useEffect } from 'react';
import { useForm } from '../../hooks/useForm';
import Form from '../Form/Form';
import './Register.css';

function Register({ onRegister, apiMessage, onClearApiMessage, isDone }) {

  const formTitle = 'Добро пожаловать!';
  const formName = 'register';
  const buttonText = 'Зарегистрироваться';
  const formText = 'Уже зарегистрированы?';
  const formLinkText = 'Войти';
  const formLink = '/signin';

  const {
    values,
    errorMessages,
    validationState,
    handleChange,
    resetForm
  } = useForm({});

  const [isValid, setIsValid] = useState(false);
  const errorName = errorMessages['name'];
  const errorEmail = errorMessages['email'];
  const errorPassword = errorMessages['password'];

  useEffect(() => {
    resetForm();
    onClearApiMessage();
  }, []);

  useEffect(() => {
    if (values.name && values.email && values.password) {
      const state = Object.values(validationState).some((item) => {
        return item === false;
      });
      setIsValid(!state);
    }
  }, [validationState, values]);

  function handleSubmit(event) {
    event.preventDefault();
    onRegister({
      "name": values.name,
      "email": values.email,
      "password": values.password,
    });
  }

  return (
    <section className="register">
      <Form
        formTitle={formTitle} formName={formName} buttonText={buttonText} formSubmit={handleSubmit}
        formText={formText} formLinkText={formLinkText} formLink={formLink}
        isValid={isValid} message={apiMessage} isDone={isDone}>

        <label className="form__label">
          Имя
          <input className={`form__input ${isValid ? "" : 'form__input_error'}`}
            name='name' type='text' onChange={handleChange}
            minLength="2" maxLength="30" pattern="[A-Za-zА-Яа-яЁё\s\-]+"
            placeholder='имя' required />
          <span className={`form__input-error ${isValid ? "" : 'form__input-error_active'}`}>{errorName} </span>
        </label>

        <label className="form__label">
          E-mail
          <input className={`form__input ${isValid ? "" : 'form__input_error'}`}
            name='email' type='email' onChange={handleChange} placeholder='email' required />
          <span className={`form__input-error ${isValid ? "" : 'form__input-error_active'}`}>{errorEmail} </span>
        </label>

        <label className="form__label">
          Пароль
          <input className={`form__input ${isValid ? "" : 'form__input_error'}`}
            name='password' type='password' onChange={handleChange} placeholder='паролль'
            minLength="8" maxLength="40" pattern="[a-zA-Z0-9]{8,40}" required />
          <span className={`form__input-error ${isValid ? "" : 'form__input-error_active'}`}>{errorPassword} </span>
        </label>

      </Form>
    </section>
  )
}

export default Register;

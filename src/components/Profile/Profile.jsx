import { useState, useEffect, useContext } from 'react';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import InfoAuthApi from '../InfoAuthApi/InfoAuthApi';
import { useForm } from '../../hooks/useForm';
import './Profile.css';

function Profile({ onUpdate, onLogout, apiMessage, onClearApiMessage, location }) {

    const currentUser = useContext(CurrentUserContext);

    const {
        values,
        setValues,
        errorMessages,
        validationState,
        handleChange,
    } = useForm({});

    const [isValid, setIsValid] = useState(false);
    const [isChangeData, setIsChangeData] = useState(false);
    const errorName = errorMessages['name'];
    const errorEmail = errorMessages['email'];

    useEffect(() => {
        onClearApiMessage();
    }, []);

    useEffect(() => {
        setValues({ name: currentUser.name, email: currentUser.email });
    }, [currentUser]);

    useEffect(() => {
        if (values.name && values.email) {
            const state = Object.values(validationState).some((item) => {
                return item === false;
            });
            setIsValid(!state);
        }
    }, [validationState, values]);

    useEffect(() => {
        if ((values.name && values.name !== currentUser.name) || (values.email && values.email !== currentUser.email)) {
            setIsChangeData(true);
        }
    }, [values]);

    function handleClick() {
        onLogout();
    }

    function handleSubmit(event) {
        event.preventDefault();
        onUpdate({
            "name": values.name,
            "email": values.email,
        });
    }

    return (
        <section className='profile'>
            <h1 className="profile__title">{`Привет, ${currentUser.name}!`}</h1>

            <form className="profile__form" name="profile" onSubmit={handleSubmit} noValidate>

                <span className={`profile__input-error ${isValid ? "" : 'profile__input-error_active'}`}>{errorName} </span>
                <label className="profile__form-label" >
                    <input className={`profile__form-input ${isValid ? "" : 'profile__form-input_error'}`} name="name" type="text"
                        onChange={handleChange} placeholder='имя' value={values.name || ''} minLength="2"
                        maxLength="30" pattern="[A-Za-zА-Яа-яЁё\s\-]+" required />
                    <span className="profile__form-label-name" >Имя</span>
                </label>

                <label className="profile__form-label profile__form-label_align_down">
                    <input className="profile__form-input" name="email" type="email"
                        onChange={handleChange} placeholder='email' value={values.email || ''}  
                        pattern='^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9\-]+[.]{1}[a-zA-Z]{2,6}$' required />
                    <span className="profile__form-label-name"> E-mail</span>
                </label>
                <span className={`profile__input-error ${isValid ? "" : 'profile__input-error_active'}`}>{errorEmail} </span>

                <InfoAuthApi message={apiMessage} />

                <button className="profile__form-submit-button" type="submit" disabled={!isValid || !isChangeData}  >Редактировать</button>

            </form>

            <button className="profile__exit-link" onClick={handleClick} type="button" >Выйти из аккаунта</button>

        </section>
    )
}

export default Profile;

import React from 'react';
import Section from '../Section/Section';
import './Profile.css';

function Profile() {
    return (
        <Section sectionName="profile">
            <h3 className="profile__title">Привет, Джулия!</h3>
            <form className="profile__form" name="profile" noValidate>

                <label className="profile__form-label" >
                    <input className="profile__form-input" name="name" type="text" minLength="2"
                        maxLength="40" required />
                    <span className="profile__form-label-name" >Имя</span>
                </label>

                <label className="profile__form-label profile__form-label_align_down">
                    <input className="profile__form-input" name="email" type="email" value="pochta@yandex.ru" required />
                    <span className="profile__form-label-name"> E-mail</span>
                </label>

                <button className="profile__form-submit-button" type="submit" >Редактировать</button>

            </form>
            <a className="profile__exit-link" href='/' >Выйти из аккаунта</a>
        </Section>
    )
}

export default Profile;

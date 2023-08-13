import './Profile.css';

function Profile() {
    return (
        <section className='profile'>
            <h1 className="profile__title">Привет, Джулия!</h1>

            <form className="profile__form" name="profile">

                <label className="profile__form-label" >
                    <input className="profile__form-input" name="name" type="text" placeholder='имя' minLength="2"
                        maxLength="40" required />
                    <span className="profile__form-label-name" >Имя</span>
                </label>

                <label className="profile__form-label profile__form-label_align_down">
                    <input className="profile__form-input" name="email" type="email" placeholder='email' required />
                    <span className="profile__form-label-name"> E-mail</span>
                </label>

                <button className="profile__form-submit-button" type="submit" >Редактировать</button>

            </form>

            <a className="profile__exit-link" href='/' >Выйти из аккаунта</a>
            
        </section>

    )
}

export default Profile;

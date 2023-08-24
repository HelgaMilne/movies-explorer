import { useNavigate } from 'react-router-dom';
import './NotFoundPage.css';

function NotFoundPage({ loggedIn }) {

    const navigate = useNavigate();

    return (
        <section className="not-found-page">
            <h1 className="not-found-page__title">404</h1>
            <p className="not-found-page__subtitle">Страница не найдена</p>
            <button className="not-found-page__back-link" onClick={() => navigate(-1)} >Назад</button>
        </section>
    )
}

export default NotFoundPage;

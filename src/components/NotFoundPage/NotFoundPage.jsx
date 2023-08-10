import Section from '../Section/Section';
import './NotFoundPage.css';

function NotFoundPage() {
    return (
        <Section sectionName="not-found-page">

            <h3 className="not-found-page__title">404</h3>
            <p className="not-found-page__subtitle">Страница не найдена</p>
            <a className="not-found-page__link" href='/' >Назад</a>

        </Section>
    )
}

export default NotFoundPage;

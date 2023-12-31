import Section from '../Section/Section';
import Portfolio from '../Portfolio/Portfolio';
import studentPhotoPath from '../../images/student.jpg';
import './AboutMe.css';

function AboutMe() {
    const headering = 'Студент';
    const portfolioItems = [
        { id: '01', name: 'Статичный сайт', url: 'https://github.com/HelgaMilne/how-to-learn' },
        { id: '02', name: 'Адаптивный сайт', url: 'https://helgamilne.github.io/long-russian-travel/' },
        { id: '03', name: 'Одностраничное приложение', url: 'https://places.nomoreparties.sbs' },
    ];

    return (
        <Section sectionName="about-me" headering={headering} >
            <section className="about-me">
                <article className="about-me__info">
                    <h3 className="about-me__title">Ольга</h3>
                    <p className="about-me__subtitle">Фронтенд-разработчик, 28 лет</p>
                    <p className="about-me__paragraph">Я родилась и живу в Санкт-Петербурге, закончила Политех. Я люблю слушать музыку, а ещё увлекаюсь большим теннисом. После того, как прошла курс по веб-разработке, начала заниматься фриланс-заказами и ушла с постоянной работы.</p>
                    <a className="about-me__link" href="https://github.com/HelgaMilne" target="_blank" rel="noopener noreferrer">Github</a>
                </article>
                <img className="about-me__image" src={studentPhotoPath} alt="портрет студента" />
            </section>
            <Portfolio items={portfolioItems} />
        </Section>
    );
}

export default AboutMe;

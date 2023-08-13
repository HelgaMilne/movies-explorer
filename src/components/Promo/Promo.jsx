import Section from '../Section/Section';
import './Promo.css';

function Promo() {

    return (
        <Section sectionName="promo">
            <section className="promo">
                <div className="promo__image"></div>
                <h1 className="promo__title">Учебный проект студента факультета Веб&#8209;разработки.</h1>
                <p className="promo__subtitle">Листайте ниже, чтобы узнать больше про этот проект и его создателя.</p>
                <a className="promo__link" href="#about-project">Узнать больше</a>
            </section>
        </Section>
    );
}

export default Promo;

import Section from '../Section/Section';
import SectionHeadering from '../SectionHeadering/SectionHeadering';
import './Techs.css';

function Techs() {

  const headering = 'Технологии';

  return (
    <Section sectionName="techs">
      <SectionHeadering headering={headering} />
      <h3 className="techs__title">7 технологий</h3>
      <p className="techs__subtitle">На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
      <ul className="techs__info-list">
        <li className="techs__info-list-item">HTML</li>
        <li className="techs__info-list-item">CSS</li>
        <li className="techs__info-list-item">JS</li>
        <li className="techs__info-list-item">React</li>
        <li className="techs__info-list-item">Git</li>
        <li className="techs__info-list-item">Express.js</li>
        <li className="techs__info-list-item">mongoDB</li>
      </ul>
    </Section>
  );
}

export default Techs;

import './Section.css';

function Section({ sectionName, id, children }) {
    return (
        <section className={`section section_for_${sectionName}`} id={id ? id : null}>
            {children}
        </section>
    );
}

export default Section;

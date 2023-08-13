import './Section.css';

function Section({ sectionName, headering, id, children }) {
    return (
        <section className={`section section_for_${sectionName}`} id={id ? id : null}>
            {
                headering && (
                    <div className="section__headering-container">
                        <h2 className="section__headering-title">{headering}</h2>
                    </div>
                )
            }
            {children}
        </section>
    );
}

export default Section;

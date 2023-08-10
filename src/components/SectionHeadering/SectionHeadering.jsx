import './SectionHeadering.css';

function SectionHeadering({ headering }) {

    return (
        <div className="section-headering__container">
            <h2 className="section-headering__title">{headering}</h2>
        </div>
    );
}

export default SectionHeadering;

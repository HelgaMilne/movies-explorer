import './TwoColumns.css';

function TwoColumns({ title01, title02, paragraph01, paragraph02 }) {

    return (
        <article className="two-columns">
            <div className="two-columns__column-container">
                <h3 className="two-columns__title">{title01}</h3>
                <p className="two-columns__paragraph">{paragraph01}</p>
            </div>
            <div className="two-columns__column-container">
                <h3 className="two-columns__title">{title02}</h3>
                <p className="two-columns__paragraph">{paragraph02}</p>
            </div>
        </article>
    );
}

export default TwoColumns;

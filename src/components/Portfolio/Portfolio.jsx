import { Link } from 'react-router-dom';
import './Portfolio.css';

function Portfolio({ items }) {

    return (
        <>
            <h4 className="portfolio__title">Портфолио</h4>
            <ul className="portfolio__list">
                {
                    items.map(item => {
                        return (
                            <li className="portfolio__list-item" key={item.id}>
                                <a className="portfolio__list-link" href={item.url} target="_blank" rel="noopener noreferrer" >{item.name}
                                    <span className="portfolio__list-icon">↗</span>
                                </a>
                            </li>
                        );
                    })
                }
            </ul>
        </>
    );
}

export default Portfolio;

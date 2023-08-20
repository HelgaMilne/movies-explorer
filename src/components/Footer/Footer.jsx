import { Routes, Route } from 'react-router-dom';
import './Footer.css';

function Footer({path}) {

      let date = new Date();

    return (
        <Routes>
            <Route path={path} element={
                <footer className="footer">
                    <h5 className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</h5>
                    <div className="footer__container">
                        <p className="footer__copyright">{`© ${date.getFullYear()}`}</p>
                        <ul className="footer__nav">
                            <li><a className="footer__nav-link" href="https://practicum.yandex.ru" target="_blank" rel="noopener noreferrer">Яндекс.Практикум</a></li>
                            <li><a className="footer__nav-link" href="https://github.com/OlgaMilne/movies-explorer-frontend" target="_blank" rel="noopener noreferrer">Github</a></li>
                        </ul>
                    </div>
                </footer>
            } />
        </Routes>
    );
}

export default Footer;

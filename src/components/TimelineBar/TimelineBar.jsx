import './TimelineBar.css';

function TimelineBar({ title01, title02, subTitle01, subTitle02, }) {

    return (
        <ul className="timeline-bar">
            <li className="timeline-bar__item timeline-bar__item_color_dark">
                <h4 className="timeline-bar__title timeline-bar__title_color_light ">{title01}</h4>
            </li>
            <li className="timeline-bar__item timeline-bar__item_color_light">
                <h4 className="timeline-bar__title timeline-bar__title_color_dark ">{title02}</h4>
            </li>
            <li className="timeline-bar__item">
                <p className="timeline-bar__subtitle">{subTitle01}</p>
            </li>
            <li className="timeline-bar__item">
                <p className="timeline-bar__subtitle">{subTitle02}</p>
            </li>
        </ul>
    );
}

export default TimelineBar;

import './Preloader.css'

const Preloader = ({ onloaded }) => {
    return (
        <div className={`preloader ${onloaded ? 'preloader_hidden' : ''}`}>
            <div className="preloader__container">
                <span className="preloader__round"></span>
            </div>
        </div>
    )
};

export default Preloader;

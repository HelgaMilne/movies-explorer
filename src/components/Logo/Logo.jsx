import { Link } from 'react-router-dom';
import './Logo.css';

function Logo({ alignSelf = false }) {

    return (
        <Link className={`logo ${alignSelf ? "logo_align-self " : ""}`} to="/"></Link>
    );
}

export default Logo;

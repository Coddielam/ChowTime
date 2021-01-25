import { Link } from 'react-router-dom';

import './Header.scss';

const Header = () => {
    return (
        <>
            <header>
                <nav>
                    <Link to="/dev">Dev Pages</Link>
                </nav>
            </header>
        </>
    )
}

export default Header;
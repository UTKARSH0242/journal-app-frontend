
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { FaBook } from 'react-icons/fa';
import '../styles/navbar.css';
import ProfileDropdown from './ProfileDropdown';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);

    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <Link to="/">
                    <FaBook style={{ marginRight: '8px' }} />
                    My Journal
                </Link>
            </div>
            <div className="navbar-menu">
                {user && <ProfileDropdown />}
            </div>
        </nav>
    );
};

export default Navbar;

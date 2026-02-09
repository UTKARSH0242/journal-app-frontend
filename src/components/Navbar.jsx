
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import '../styles/navbar.css';
import { FaSignOutAlt, FaBook } from 'react-icons/fa';

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
                {user && (
                    <>
                        <span className="navbar-user">Hello, {user.username}</span>
                        <button onClick={logout} className="logout-btn">
                            <FaSignOutAlt style={{ marginRight: '5px' }} /> Logout
                        </button>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;

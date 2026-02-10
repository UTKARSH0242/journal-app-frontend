import { useState, useRef, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { Link } from 'react-router-dom';
import { FaUser, FaSignOutAlt, FaMoon, FaSun, FaDesktop, FaChevronDown } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const ProfileDropdown = () => {
    const { user, logout } = useContext(AuthContext);
    const { theme, setThemePreference } = useTheme();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const toggleDropdown = () => setIsOpen(!isOpen);

    const handleThemeChange = (mode) => {
        setThemePreference(mode);
    };

    const dropdownVariants = {
        hidden: { opacity: 0, y: -10, scale: 0.95 },
        visible: { opacity: 1, y: 0, scale: 1 }
    };

    return (
        <div className="profile-dropdown-container" ref={dropdownRef} style={{ position: 'relative' }}>
            <button
                onClick={toggleDropdown}
                className="profile-trigger"
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    background: 'var(--glass-bg)',
                    border: '1px solid var(--glass-border)',
                    padding: '0.5rem 1rem',
                    borderRadius: '24px',
                    cursor: 'pointer',
                    color: 'var(--text-primary)',
                    boxShadow: 'var(--shadow-sm)',
                    transition: 'all 0.2s'
                }}
            >
                <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, var(--primary-color), #4338ca)',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 'bold'
                }}>
                    {user?.username?.charAt(0).toUpperCase()}
                </div>
                <span style={{ fontWeight: 500 }}>{user?.username}</span>
                <FaChevronDown size={12} style={{ transition: 'transform 0.2s', transform: isOpen ? 'rotate(180deg)' : 'rotate(0)' }} />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="dropdown-menu"
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        variants={dropdownVariants}
                        transition={{ duration: 0.2 }}
                        style={{
                            position: 'absolute',
                            top: '120%',
                            right: 0,
                            width: '260px',
                            background: 'var(--card-bg)',
                            backdropFilter: 'blur(20px)',
                            WebkitBackdropFilter: 'blur(20px)',
                            border: '1px solid var(--glass-border)',
                            borderRadius: '16px',
                            padding: '1rem',
                            boxShadow: 'var(--shadow-lg)',
                            zIndex: 1000,
                            overflow: 'hidden'
                        }}
                    >
                        {/* Profile Link */}
                        <div style={{ marginBottom: '1rem', paddingBottom: '1rem', borderBottom: '1px solid var(--glass-border)' }}>
                            <div style={{ fontWeight: '600', color: 'var(--text-primary)', marginBottom: '0.25rem' }}>{user?.username}</div>
                            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{user?.email}</div>
                            <Link
                                to="/profile"
                                onClick={() => setIsOpen(false)}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    marginTop: '0.75rem',
                                    color: 'var(--primary-color)',
                                    textDecoration: 'none',
                                    fontSize: '0.9rem',
                                    fontWeight: '500'
                                }}
                            >
                                <FaUser /> View Profile
                            </Link>
                        </div>

                        {/* Theme Selection */}
                        <div style={{ marginBottom: '1rem' }}>
                            <small style={{ color: 'var(--text-secondary)', display: 'block', marginBottom: '0.5rem' }}>Theme</small>
                            <div style={{ display: 'flex', background: 'var(--input-bg)', borderRadius: '8px', padding: '2px', border: '1px solid var(--glass-border)' }}>
                                {['light', 'dark'].map(mode => (
                                    <button
                                        key={mode}
                                        onClick={() => handleThemeChange(mode)}
                                        title={`${mode.charAt(0).toUpperCase() + mode.slice(1)} Mode`}
                                        style={{
                                            flex: 1,
                                            background: theme === mode ? 'var(--card-bg)' : 'transparent',
                                            border: theme === mode ? '2px solid var(--primary-color)' : '1px solid var(--input-border)',
                                            borderRadius: '6px',
                                            padding: '6px',
                                            cursor: 'pointer',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            color: theme === mode ? 'var(--primary-color)' : (theme === 'light' ? '#000000' : '#e2e8f0'),
                                            boxShadow: theme === mode ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                                            transition: 'all 0.2s',
                                            marginTop: 0,
                                            width: 'auto'
                                        }}
                                    >
                                        {mode === 'light' && <FaSun size={14} />}
                                        {mode === 'dark' && <FaMoon size={14} />}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Logout */}
                        <button
                            onClick={logout}
                            style={{
                                width: '100%',
                                padding: '0.75rem',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '0.5rem',
                                background: 'rgba(239, 68, 68, 0.1)',
                                color: '#ef4444',
                                border: 'none',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                fontSize: '0.95rem',
                                fontWeight: '600',
                                marginTop: '0',
                                transition: 'background 0.2s'
                            }}
                            onMouseOver={(e) => e.target.style.background = 'rgba(239, 68, 68, 0.2)'}
                            onMouseOut={(e) => e.target.style.background = 'rgba(239, 68, 68, 0.1)'}
                        >
                            <FaSignOutAlt /> Logout
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ProfileDropdown;

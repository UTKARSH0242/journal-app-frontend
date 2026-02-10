import { useTheme } from '../context/ThemeContext';
import { motion } from 'framer-motion';
import { FaSun, FaMoon } from 'react-icons/fa';

const AuthThemeToggle = () => {
    const { theme, setThemePreference } = useTheme();

    const nextTheme = () => {
        return theme === 'light' ? 'dark' : 'light';
    };

    const handleToggle = () => {
        setThemePreference(nextTheme());
    };

    const getIcon = () => {
        return theme === 'light' ? <FaSun size={20} /> : <FaMoon size={20} />;
    };

    return (
        <motion.button
            onClick={handleToggle}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                background: 'var(--glass-bg)',
                border: '1px solid var(--glass-border)',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: 'var(--text-primary)',
                boxShadow: 'var(--shadow-sm)',
                zIndex: 10
            }}
            title={`Current: ${theme} (Click to switch)`}
        >
            {getIcon()}
        </motion.button>
    );
};

export default AuthThemeToggle;

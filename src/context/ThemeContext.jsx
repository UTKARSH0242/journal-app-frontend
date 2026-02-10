import React, { createContext, useState, useEffect, useContext } from 'react';

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
    // Theme state can be 'light' or 'dark'
    const [theme, setTheme] = useState(() => {
        const storedTheme = localStorage.getItem('themePreference');
        return (storedTheme === 'light' || storedTheme === 'dark') ? storedTheme : 'light';
    });

    useEffect(() => {
        document.body.setAttribute('data-theme', theme);
        localStorage.setItem('themePreference', theme);
    }, [theme]);

    const setThemePreference = (mode) => {
        setTheme(mode);
    };

    return (
        <ThemeContext.Provider value={{ theme, setThemePreference }}>
            {children}
        </ThemeContext.Provider>
    );
};

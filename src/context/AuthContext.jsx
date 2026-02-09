
import { createContext, useState, useEffect } from 'react';
import api from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser) {
            setUser(storedUser);
        }
        setLoading(false);
    }, []);

    const login = async (username, password) => {
        const authdata = window.btoa(username + ':' + password);
        try {
            // Test credentials by making a request to a protected endpoint or just store them if successful
            // Ideally, you'd hit a /user/me or similar, but for now we'll assume valid if the user can log in.
            // Actually, let's try to hit the user endpoint to verify.
            const response = await api.get('/user', {
                headers: {
                    Authorization: `Basic ${authdata}`
                }
            });

            if (response.status === 200) {
                const userData = { username, authdata };
                localStorage.setItem('user', JSON.stringify(userData));
                setUser(userData);
                return true;
            }
        } catch (error) {
            console.error("Login failed", error);
            return false;
        }
    };

    const logout = () => {
        localStorage.removeItem('user');
        setUser(null);
    };

    const signup = async (username, password, email, sentimentAnalysis) => {
        try {
            await api.post('/public/create-user', { username, password, email, sentimentAnalysis });
            return true;
        } catch (error) {
            console.error("Signup failed", error);
            return false;
        }
    }

    return (
        <AuthContext.Provider value={{ user, login, logout, signup, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import AuthThemeToggle from '../components/AuthThemeToggle';

const Signup = () => {
    const { signup } = useContext(AuthContext);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        email: '',
        sentimentAnalysis: false
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Custom Validation
        if (!formData.username.trim() || !formData.password.trim()) {
            toast.error('Username and Password are required');
            return;
        }

        if (formData.password.length < 6) {
            toast.error('Password must be at least 6 characters');
            return;
        }

        setLoading(true);
        try {
            const success = await signup(formData.username, formData.password, formData.email, formData.sentimentAnalysis);
            if (success) {
                toast.success('Account created successfully!');
                navigate('/login');
            } else {
                toast.error('Username already taken. Please try another.');
            }
        } catch (err) {
            toast.error('Signup failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <AuthThemeToggle />
            <motion.div
                className="auth-box"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <h2>Create Account</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Username</label>
                        <motion.input
                            whileFocus={{ scale: 1.02 }}
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            placeholder="Choose a username"
                        />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <motion.input
                            whileFocus={{ scale: 1.02 }}
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Create a strong password"
                        />
                    </div>
                    <div className="form-group">
                        <label>Email (Optional)</label>
                        <motion.input
                            whileFocus={{ scale: 1.02 }}
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="your@email.com"
                        />
                    </div>
                    <div className="form-group checkbox-group">
                        <label>
                            <input
                                type="checkbox"
                                name="sentimentAnalysis"
                                checked={formData.sentimentAnalysis}
                                onChange={handleChange}
                            />
                            Enable AI Sentiment Analysis
                        </label>
                    </div>
                    <motion.button
                        type="submit"
                        disabled={loading}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        {loading ? <LoadingSpinner size="small" color="#fff" /> : 'Get Started'}
                    </motion.button>
                    <p>
                        Already have an account? <Link to="/login">Login</Link>
                    </p>
                </form>
            </motion.div>
        </div>
    );
};

export default Signup;

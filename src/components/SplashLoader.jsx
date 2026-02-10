import React from 'react';
import '../styles/animations.css';
import { HashLoader } from 'react-spinners';

const SplashLoader = () => {
    return (
        <div className="splash-screen fade-in">
            <div className="splash-logo" style={{ marginBottom: '2rem' }}>Journal App</div>
            <div className="splash-spinner">
                <HashLoader color="#4f46e5" size={80} />
            </div>
            <p style={{ marginTop: '20px', color: '#666', fontSize: '1rem', fontWeight: 500 }}>Preparing your space...</p>
        </div>
    );
};

export default SplashLoader;

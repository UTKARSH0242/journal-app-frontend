import React from 'react';
import { HashLoader, PulseLoader } from 'react-spinners';

const LoadingSpinner = ({ size = 'medium', color = '#4f46e5' }) => {
    // For small buttons, use a subtle PulseLoader
    if (size === 'small') {
        return <PulseLoader color={color} size={6} margin={2} />;
    }

    // For larger states, use the premium HashLoader
    return (
        <div className="loading-spinner-container" style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
            <HashLoader color={color} size={50} />
        </div>
    );
};

export default LoadingSpinner;

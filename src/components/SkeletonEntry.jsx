import React from 'react';
import '../styles/animations.css';

const SkeletonEntry = () => {
    return (
        <div className="skeleton-card">
            <div className="skeleton-shimmer"></div>
            {/* These static divs sit behind the shimmer just to give structure if needed, 
                but usually the shimmer overlay handles it. Or you can structure it differently.
                Let's make the shimmer wrap specific elements for better effect. 
            */}
            <div style={{ position: 'relative', zIndex: 1, opacity: 0.5 }}>
                <div className="skeleton-title" style={{ background: '#ddd' }}></div>
                <div className="skeleton-date" style={{ background: '#ddd' }}></div>
                <div className="skeleton-line" style={{ background: '#ddd' }}></div>
                <div className="skeleton-line" style={{ background: '#ddd' }}></div>
                <div className="skeleton-line short" style={{ background: '#ddd' }}></div>
            </div>
        </div>
    );
};

export default SkeletonEntry;

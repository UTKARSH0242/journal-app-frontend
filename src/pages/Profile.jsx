import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import { FaUserCircle, FaEnvelope, FaCalendarAlt, FaBrain, FaIdBadge } from 'react-icons/fa';
import '../styles/auth.css'; // Reusing auth styles for card look

const Profile = () => {
    const { user } = useContext(AuthContext);


    if (!user) return <div className="dashboard-container"><Navbar /><div className="content-wrapper">Loading...</div></div>;

    return (
        <div className="dashboard-container fade-in">
            <Navbar />
            <div className="content-wrapper" style={{ alignItems: 'center', marginTop: '4rem' }}>
                <div className="auth-box" style={{ maxWidth: '600px', padding: '3rem' }}>
                    <div className="profile-header" style={{ marginBottom: '2rem' }}>
                        <FaUserCircle size={80} color="var(--primary-color)" />
                        <h2 style={{ marginTop: '1rem' }}>{user.username}</h2>
                        <p style={{ color: 'var(--text-secondary)' }}>Journalist</p>
                    </div>

                    <div className="profile-details" style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <div className="detail-item" style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', background: 'var(--input-bg)', borderRadius: '12px', border: '1px solid var(--glass-border)' }}>
                            <FaEnvelope size={20} color="var(--text-secondary)" />
                            <div>
                                <small style={{ display: 'block', color: 'var(--text-secondary)' }}>Email</small>
                                <span style={{ color: 'var(--text-primary)', fontWeight: '500' }}>{user.email || 'No email provided'}</span>
                            </div>
                        </div>

                        <div className="detail-item" style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', background: 'var(--input-bg)', borderRadius: '12px', border: '1px solid var(--glass-border)' }}>
                            <FaCalendarAlt size={20} color="var(--text-secondary)" />
                            <div>
                                <small style={{ display: 'block', color: 'var(--text-secondary)' }}>Joined</small>
                                <span style={{ color: 'var(--text-primary)', fontWeight: '500' }}>August 2024</span> {/* Placeholder or add joinedAt to user model */}
                            </div>
                        </div>

                        <div className="detail-item" style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', background: 'var(--input-bg)', borderRadius: '12px', border: '1px solid var(--glass-border)' }}>
                            <FaBrain size={20} color="var(--text-secondary)" />
                            <div>
                                <small style={{ display: 'block', color: 'var(--text-secondary)' }}>Sentiment Analysis</small>
                                <span style={{ color: 'var(--text-primary)', fontWeight: '500' }}>{user.sentimentAnalysis ? 'Enabled' : 'Disabled'}</span>
                            </div>
                        </div>

                        <div className="detail-item" style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', background: 'var(--input-bg)', borderRadius: '12px', border: '1px solid var(--glass-border)' }}>
                            <FaIdBadge size={20} color="var(--text-secondary)" />
                            <div>
                                <small style={{ display: 'block', color: 'var(--text-secondary)' }}>Account Role</small>
                                <span style={{ color: 'var(--text-primary)', fontWeight: '500' }}>{user.roles && user.roles.length > 0 ? user.roles.join(', ') : 'User'}</span>
                            </div>
                        </div>


                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;

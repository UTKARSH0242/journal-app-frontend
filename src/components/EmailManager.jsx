import { useState } from 'react';
import api from '../services/api';
import { FaEnvelope, FaPaperPlane } from 'react-icons/fa';
import toast from 'react-hot-toast';

const EmailManager = () => {
    const [sending, setSending] = useState(false);

    const handleSendEmail = async () => {
        setSending(true);
        const toastId = toast.loading('Sending summary email...');
        try {
            await api.post('/email/trigger');
            toast.success('Email sent successfully!', { id: toastId });
        } catch (error) {
            console.error(error);
            toast.error('Failed to send email.', { id: toastId });
        } finally {
            setSending(false);
        }
    };

    return (
        <div className="email-manager" style={{
            background: 'var(--card-bg)',
            padding: '1.5rem',
            borderRadius: '16px',
            border: '1px solid var(--glass-border)',
            boxShadow: 'var(--shadow-sm)',
            marginBottom: '2rem'
        }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ margin: 0, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <FaEnvelope /> Email Assistant
                </h3>
                <button
                    onClick={handleSendEmail}
                    disabled={sending}
                    style={{
                        padding: '0.6rem 1.2rem',
                        borderRadius: '8px',
                        border: 'none',
                        background: 'var(--primary-color)',
                        color: 'white',
                        cursor: sending ? 'not-allowed' : 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        fontWeight: '600',
                        opacity: sending ? 0.7 : 1
                    }}
                >
                    {sending ? 'Sending...' : <><FaPaperPlane /> Send Summary Now</>}
                </button>
            </div>
        </div>
    );
};

export default EmailManager;


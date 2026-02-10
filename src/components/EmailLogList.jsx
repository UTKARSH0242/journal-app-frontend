import { useState, useEffect } from 'react';
import api from '../services/api';
import { FaEnvelope, FaHistory } from 'react-icons/fa';

const EmailLogList = () => {
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLogs = async () => {
            try {
                const response = await api.get('/email/logs');
                setLogs(response.data);
            } catch (error) {
                console.error("Failed to fetch email logs", error);
            } finally {
                setLoading(false);
            }
        };

        fetchLogs();
    }, []);

    if (loading) return <div style={{ padding: '1rem', textAlign: 'center' }}>Loading email history...</div>;

    if (logs.length === 0) return null;

    return (
        <div className="email-log-list" style={{
            background: 'var(--card-bg)',
            padding: '1.5rem',
            borderRadius: '16px',
            border: '1px solid var(--glass-border)',
            boxShadow: 'var(--shadow-sm)',
            marginBottom: '2rem'
        }}>
            <h3 style={{ marginBottom: '1rem', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <FaHistory /> Email History
            </h3>
            <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ borderBottom: '1px solid var(--glass-border)', textAlign: 'left' }}>
                            <th style={{ padding: '8px', color: 'var(--text-secondary)' }}>Sent Date</th>
                            <th style={{ padding: '8px', color: 'var(--text-secondary)' }}>Sentiment</th>
                            <th style={{ padding: '8px', color: 'var(--text-secondary)' }}>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {logs.slice().reverse().map((log, index) => (
                            <tr key={index} style={{ borderBottom: '1px solid var(--glass-border-light)' }}>
                                <td style={{ padding: '8px', color: 'var(--text-primary)' }}>
                                    {new Date(log.timestamp).toLocaleString()}
                                </td>
                                <td style={{ padding: '8px', color: 'var(--text-primary)' }}>
                                    {log.sentiment}
                                </td>
                                <td style={{ padding: '8px', color: 'var(--text-secondary)', fontSize: '0.9em' }}>
                                    {log.emailAddress}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default EmailLogList;

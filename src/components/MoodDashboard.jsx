
import { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import api from '../services/api';

const MoodDashboard = () => {
    const [moodData, setMoodData] = useState([]);
    const [loading, setLoading] = useState(true);

    const COLORS = {
        HAPPY: '#4ade80',   // Green
        SAD: '#60a5fa',     // Blue
        ANGRY: '#f87171',   // Red
        ANXIOUS: '#fbbf24', // Yellow
        NEUTRAL: '#94a3b8'  // Grey
    };

    useEffect(() => {
        const fetchMoodData = async () => {
            try {
                // Fetch dictionary like { SAD: 2, HAPPY: 5 }
                const response = await api.get('/mood-analytics');

                // Transform to array for Recharts: [{name: 'HAPPY', value: 5}, ...]
                const chartData = Object.entries(response.data).map(([key, value]) => ({
                    name: key,
                    value: value
                }));

                setMoodData(chartData);
            } catch (error) {
                console.error("Failed to fetch mood analytics", error);
            } finally {
                setLoading(false);
            }
        };

        fetchMoodData();
    }, []);

    const [summary, setSummary] = useState('');
    const [summaryLoading, setSummaryLoading] = useState(false);

    const fetchWeeklySummary = async () => {
        setSummaryLoading(true);
        try {
            const response = await api.get('/journal/weekly-summary');
            setSummary(response.data.summary);
        } catch (error) {
            console.error("Failed to fetch summary", error);
            setSummary("Failed to load summary. Please try again.");
        } finally {
            setSummaryLoading(false);
        }
    };

    if (loading) return <div style={{ padding: '1rem', textAlign: 'center' }}>Loading insights...</div>;

    if (moodData.length === 0) return (
        <div style={{
            padding: '2rem',
            textAlign: 'center',
            background: 'var(--card-bg)',
            borderRadius: '12px',
            border: '1px solid var(--glass-border)',
            color: 'var(--text-secondary)'
        }}>
            No mood data available yet. Start journaling!
        </div>
    );

    return (
        <div className="mood-dashboard" style={{
            background: 'var(--card-bg)',
            padding: '1.5rem',
            borderRadius: '16px',
            border: '1px solid var(--glass-border)',
            boxShadow: 'var(--shadow-sm)',
            marginBottom: '2rem'
        }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '10px' }}>
                <h3 style={{ margin: 0, color: 'var(--text-primary)' }}>Mood Analytics</h3>
                <button
                    onClick={fetchWeeklySummary}
                    disabled={summaryLoading}
                    className="summary-btn"
                    style={{
                        padding: '0.6rem 1.2rem',
                        borderRadius: '12px',
                        border: 'none',
                        background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
                        color: 'white',
                        cursor: summaryLoading ? 'wait' : 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        fontSize: '0.9rem',
                        fontWeight: '600',
                        boxShadow: '0 4px 12px rgba(99, 102, 241, 0.3)',
                        transition: 'all 0.3s ease',
                        opacity: summaryLoading ? 0.8 : 1
                    }}
                >
                    {summaryLoading ? (
                        <>Generating...</>
                    ) : (
                        <>✨ Weekly Summary</>
                    )}
                </button>
            </div>

            <div style={{ width: '100%', height: 300 }}>
                <ResponsiveContainer>
                    <PieChart>
                        <Pie
                            data={moodData}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={80}
                            paddingAngle={5}
                            dataKey="value"
                        >
                            {moodData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[entry.name] || COLORS.NEUTRAL} />
                            ))}
                        </Pie>
                        <Tooltip
                            contentStyle={{
                                background: 'rgba(255, 255, 255, 0.9)',
                                border: 'none',
                                borderRadius: '8px',
                                color: '#1e293b'
                            }}
                        />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </div>

            {summary && (
                <div className="weekly-summary" style={{
                    marginTop: '2rem',
                    padding: '1.5rem',
                    background: 'rgba(99, 102, 241, 0.1)',
                    borderRadius: '12px',
                    borderLeft: '4px solid #6366f1',
                    animation: 'fadeIn 0.5s ease'
                }}>
                    <h4 style={{ margin: '0 0 0.8rem 0', color: '#6366f1', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        ✨ AI Weekly Insights
                    </h4>
                    <p style={{ lineHeight: '1.6', color: 'var(--text-primary)', margin: 0, whiteSpace: 'pre-line' }}>
                        {summary}
                    </p>
                </div>
            )}
        </div>
    );
};

export default MoodDashboard;

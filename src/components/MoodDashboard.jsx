
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
            <h3 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>Mood Analytics</h3>
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
        </div>
    );
};

export default MoodDashboard;

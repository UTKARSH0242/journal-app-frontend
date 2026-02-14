import { useState, useEffect, useContext } from 'react';
import api from '../services/api';
import Navbar from '../components/Navbar';
import LoadingSpinner from '../components/LoadingSpinner';
import SkeletonEntry from '../components/SkeletonEntry';
import MoodDashboard from '../components/MoodDashboard';
import EmailManager from '../components/EmailManager';
import EmailLogList from '../components/EmailLogList';
import '../styles/dashboard.css';
import { FaEdit, FaTrash, FaPlus, FaSave, FaTimes, FaCloudSun } from 'react-icons/fa';

const Dashboard = () => {
    const [entries, setEntries] = useState([]);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [editingId, setEditingId] = useState(null);
    const [error, setError] = useState('');
    const [weather, setWeather] = useState(null);
    const [location, setLocation] = useState('');
    const [loadingEntries, setLoadingEntries] = useState(true);
    const [actionLoading, setActionLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoadingEntries(true);
            try {
                await Promise.all([fetchEntries(), fetchWeather()]);
            } catch (err) {
                console.error("Error fetching initial data", err);
            } finally {
                setLoadingEntries(false);
            }
        };
        fetchData();
    }, []);

    const fetchEntries = async () => {
        try {
            const response = await api.get('/journal');
            setEntries(response.data);
        } catch (error) {
            console.error("Error fetching entries", error);
        }
    };

    const fetchWeather = async () => {
        const fetchWeatherWithLocation = async (lat, lon) => {
            try {
                let url = '/user';
                if (lat && lon) {
                    url += `?lat=${lat}&lon=${lon}`;
                }
                const response = await api.get(url); // Now returns JSON
                if (response.data.weather) {
                    setWeather(response.data.weather);
                    setLocation(response.data.location);
                }
            } catch (error) {
                console.error("Error fetching weather", error);
            }
        };

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    fetchWeatherWithLocation(position.coords.latitude, position.coords.longitude);
                },
                (error) => {
                    console.error("Geolocation error:", error);
                    fetchWeatherWithLocation(); // Fallback to default
                }
            );
        } else {
            fetchWeatherWithLocation(); // Fallback if geolocation not supported
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setActionLoading(true);
        try {
            if (editingId) {
                await api.put(`/journal/id/${editingId}`, { title, content });
                setEditingId(null);
            } else {
                await api.post('/journal', { title, content });
            }
            setTitle('');
            setContent('');
            await fetchEntries(); // Refresh list to get new sentiment
        } catch (error) {
            setError('Failed to save entry');
        } finally {
            setActionLoading(false);
        }
    };

    const handleEdit = (entry) => {
        setEditingId(entry.id);
        setTitle(entry.title);
        setContent(entry.content);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const [entryToDelete, setEntryToDelete] = useState(null);
    const [deleteLoading, setDeleteLoading] = useState(false);

    const handleDelete = (entry) => {
        setEntryToDelete(entry);
    };

    const confirmDelete = async () => {
        if (!entryToDelete) return;
        setDeleteLoading(true);
        try {
            await api.delete(`/journal/id/${entryToDelete.id}`);
            await fetchEntries();
        } catch (error) {
            console.error("Error deleting entry", error);
        } finally {
            setDeleteLoading(false);
            setEntryToDelete(null);
        }
    };

    const handleCancel = () => {
        setEditingId(null);
        setTitle('');
        setContent('');
    }

    const getSentimentEmoji = (sentiment) => {
        switch (sentiment) {
            case 'HAPPY': return '😃';
            case 'SAD': return '😢';
            case 'ANGRY': return '😠';
            case 'ANXIOUS': return '😰';
            case 'NEUTRAL': return '😐';
            default: return '😐';
        }
    };

    if (loadingEntries) {
        return (
            <div className="dashboard-container">
                <Navbar />
                <div className="content-wrapper">
                    {/* Skeleton Loader Grid */}
                    <div className="entries-list">
                        <h3>Your Journal</h3>
                        <div className="cards-grid">
                            {[1, 2, 3, 4, 5, 6].map((n) => (
                                <SkeletonEntry key={n} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="dashboard-container fade-in">
            <Navbar />
            <div className="content-wrapper">

                {/* Weather Widget */}
                {weather && (
                    <div className="weather-widget">
                        <div className="weather-icon"><FaCloudSun /></div>
                        <div className="weather-info">
                            <h3>{location}</h3>
                            <p className="temp">{weather.temperature}°C</p>
                            <p className="desc">Feels like {weather.feelslike}°C</p>
                        </div>
                    </div>
                )}

                <div className="entry-form">
                    <h3>{editingId ? 'Edit Entry' : 'Create New Entry'}</h3>
                    {error && <p className="error">{error}</p>}
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <input
                                type="text"
                                placeholder="Title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <textarea
                                placeholder="Write your thoughts..."
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                required
                                rows="5"
                            />
                        </div>
                        <div className="form-actions">
                            <button type="submit" disabled={actionLoading}>
                                {actionLoading ? (
                                    <><LoadingSpinner size="small" /> Saving...</>
                                ) : (
                                    editingId ? <><FaSave /> Update</> : <><FaPlus /> Save</>
                                )}
                            </button>
                            {editingId && (
                                <button type="button" onClick={handleCancel} className="cancel-btn">
                                    <FaTimes /> Cancel
                                </button>
                            )}
                        </div>
                    </form>
                </div>

                <div className="entries-list">
                    <MoodDashboard />
                    <EmailLogList />
                    <EmailManager />
                    <h3>Your Journal</h3>
                    {entries.length === 0 ? (
                        <p>No entries yet. Start writing!</p>
                    ) : (
                        <div className="cards-grid stagger-fade-in">
                            {entries.map((entry) => (
                                <div key={entry.id} className="entry-card">
                                    <div>
                                        <div className="entry-header">
                                            <div className="title-row">
                                                <h4>{entry.title}</h4>
                                                <span className="sentiment-emoji" title={entry.sentiment}>
                                                    {getSentimentEmoji(entry.sentiment)}
                                                </span>
                                            </div>
                                            <span className="entry-date">{new Date(entry.date).toLocaleDateString()}</span>
                                        </div>
                                        <p className="entry-content">{entry.content}</p>
                                        {entry.aiFeedback && (
                                            <div className="ai-feedback">
                                                <strong>✨ AI Coach:</strong>
                                                <p>{entry.aiFeedback}</p>
                                            </div>
                                        )}
                                    </div>
                                    <div className="entry-actions">
                                        <button onClick={() => handleEdit(entry)} className="icon-btn edit" title="Edit">
                                            <FaEdit />
                                        </button>
                                        <button onClick={() => handleDelete(entry)} className="icon-btn delete" title="Delete">
                                            <FaTrash />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            {/* Delete Confirmation Modal */}
            {entryToDelete && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h3>Delete Entry?</h3>
                        <p>Are you sure you want to delete <strong>{entryToDelete.title}</strong>? This action cannot be undone.</p>
                        <div className="modal-actions">
                            <button onClick={() => setEntryToDelete(null)} className="cancel-btn">Cancel</button>
                            <button onClick={confirmDelete} className="delete-confirm-btn" disabled={deleteLoading}>
                                {deleteLoading ? <><LoadingSpinner size="small" /> Deleting...</> : 'Delete'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;

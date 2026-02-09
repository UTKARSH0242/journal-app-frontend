
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/journal';

const api = axios.create({
    baseURL: API_URL,
});

api.interceptors.request.use((config) => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.authdata) {
        config.headers.Authorization = `Basic ${user.authdata}`;
    }
    return config;
});

export default api;

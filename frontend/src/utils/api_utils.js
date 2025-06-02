import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const baseUrl = import.meta.env.VITE_BACKEND_URI || 'http://localhost:5000';

const getUserId = () => {
    const token = localStorage.getItem('project-bk-token');
    if (!token) return null;
    const decoded = jwtDecode(token);
    return decoded.userId;
}

export const saveGame = async (data, createdAt) => {
    try {
        const userId = getUserId();
        if (!userId) throw new Error('Not Logged In');
        const response = await axios.post(`${baseUrl}/api/games/`, {
            userId,
            data,
            createdAt,
        });
        return response.data;
    } catch (error) {
        console.error('Error saving game:', error);
    }
}

export const deleteSave = async (userId, createdAt) => {
    if (!userId || !createdAt) return;
    try {
        return await axios.delete(`${baseUrl}/api/games/`, {
            data: {
                userId,
                createdAt,
            },
        })
    } catch (error) {
        console.error('Error deleting save:', error);
    }
}

export const getSavedGames = async () => {
    const userId = getUserId();
    if (!userId) return [];

    try {
        const response = await axios.get(`${baseUrl}/api/games/${userId}`);
        console.log('Fetched saved games:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching saved games:', error);
        return [];
    }
}

export const register = async (formData) => {
    return await axios.post(baseUrl + '/api/register/', formData);
}

export const login = async (formData) => {
    try {
        const res = await axios.post(baseUrl + '/api/login/', formData);
        const { token } = res.data;
        localStorage.setItem('project-bk-token', token);
    } catch (error) {
        console.error('Error logging in:', error);
    }
}

export const logout = () => localStorage.removeItem('project-bk-token');

export const getUsername = async () => {
    try {
        const userId = getUserId();
        if (!userId) return '';
        const user = await axios.get(`${baseUrl}/api/user/${userId}`);
        return user.data.username || '';

    } catch (error) {
        console.error('Error getting username:', error);
        return null;
    }
}

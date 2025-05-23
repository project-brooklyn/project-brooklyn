import axios from 'axios';

export const deleteSave = async (userId, createdAt) => {
    if (!userId) return;
    try {
        return await axios.delete(`${import.meta.env.VITE_BACKEND_URI}/api/games/`, {
            data: {
                userId,
                createdAt,
            },
        })
    } catch (error) {
        console.error('Error deleting save:', error);
    }
}

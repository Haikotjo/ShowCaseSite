import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'https://api.unsplash.com/',
    headers: {
        Authorization: `Client-ID ${process.env.REACT_APP_UNSPLASH_API_KEY}`
    }
});

export const getPhotos = async (endpoint, count = 10) => {
    try {
        const response = await apiClient.get(`${endpoint}?count=${count}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

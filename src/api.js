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
        console.log("Response data:", response.data);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getTopics = async () => {
    try {
        const response = await apiClient.get('topics');
        return response.data;
    } catch (error) {
        throw error;
    }
};


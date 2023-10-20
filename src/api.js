import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'https://api.unsplash.com/',
    headers: {
        Authorization: `Client-ID ${process.env.REACT_APP_UNSPLASH_API_KEY}`
    }
});

export const getPhotos = async (endpoint, perPage = 16, page = 1) => {
    try {
        const url = `${endpoint}?per_page=${perPage}&page=${page}`;
        const response = await apiClient.get(url);
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


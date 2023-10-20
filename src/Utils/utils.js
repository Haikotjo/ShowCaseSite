import {getPhotos, getTopics} from "../api";

export const fetchRandomTopics = async () => {
    const topics = await getTopics();
    return topics[Math.floor(Math.random() * topics.length)];
};

export const fetchData = async (currentTopic, pageNumber) => {
    if (!currentTopic) return null;
    const endpoint = `topics/${currentTopic.id}/photos`;
    const photoData = await getPhotos(endpoint, 16, pageNumber);
    return photoData;
};

export const handleResize = (setWindowWidth) => {
    return () => {
        setWindowWidth(window.innerWidth);
    };
};

export const handleScroll = (lastScrollTime, setPageNumber, setLastScrollTime) => {
    return () => {
        const currentTime = Date.now();
        if (currentTime - lastScrollTime < 5000) return;

        if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight) {
            setPageNumber(prevPageNumber => prevPageNumber + 1);
            setLastScrollTime(currentTime);
        }
    };
};
import React, { useEffect, useState } from 'react';
import PhotoCard from "./PhotoCard/Photocard";
import styles from './App.module.scss';
import TopicsMenu from "./Menu/TopicsMenu";
import {fetchData, fetchRandomTopics, handleResize, handleScroll} from "./Utils/utils";

function App() {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [photos, setPhotos] = useState([]);
    const [currentTopic, setCurrentTopic] = useState(null);
    const [pageNumber, setPageNumber] = useState(1); // Nieuwe state voor paginanummer
    const [lastScrollTime, setLastScrollTime] = useState(0);

    // Haal willekeurig topic op bij eerste render
    useEffect(() => {
        const fetchData = async () => {
            const randomTopic = await fetchRandomTopics();
            setCurrentTopic(randomTopic);
        };
        fetchData();
    }, []);


    // Haal foto's op
    useEffect(() => {
        const fetchPhotos = async () => {
            const photoData = await fetchData(currentTopic, pageNumber);
            if (pageNumber === 1) {
                setPhotos(photoData);
            } else {
                setPhotos(prevPhotos => [...prevPhotos, ...photoData]);
            }
        };
        fetchPhotos();
    }, [currentTopic, pageNumber]);


    useEffect(() => {
        const resizeHandler = handleResize(setWindowWidth);
        window.addEventListener('resize', resizeHandler);

        return () => {
            window.removeEventListener('resize', resizeHandler);
        };
    }, []);

    useEffect(() => {
        const scrollHandler = handleScroll(lastScrollTime, setPageNumber, setLastScrollTime);
        window.addEventListener('scroll', scrollHandler);

        return () => {
            window.removeEventListener('scroll', scrollHandler);
        };
    }, [lastScrollTime]);

    const handleSelectTopic = (selectedTopic) => {
        setCurrentTopic(selectedTopic);
    };

    return (
        <div>
            <TopicsMenu onSelectTopic={handleSelectTopic} />
            <h1 className={styles['topic-title']}>
                {currentTopic ? currentTopic.title : 'Loading...'}
            </h1>
            <div className={styles['center-container']}>
                <div className={styles['custom-container']}>
                    {photos && photos.map((photo, index) => {
                        const isFullWidth = windowWidth <= 767 ? true :
                            windowWidth <= 991 ? (index + 1) % 3 === 0 :
                                (index + 1) % 4 === 0;
                        return (
                            <div className={`${styles['custom-col']} ${isFullWidth ? styles['full-width-card'] : ''}`} key={index}>
                                <PhotoCard
                                    isFullWidth={isFullWidth}
                                    photoUrl={photo.urls.small}
                                    largePhotoUrl={photo.urls.full}
                                    text={photo.alt_description || 'Geen beschrijving'}
                                />
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default App;

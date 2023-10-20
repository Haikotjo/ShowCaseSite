import React, { useEffect, useState } from 'react';
import {getPhotos, getTopics} from "./api";
import PhotoCard from "./PhotoCard/Photocard";
import styles from './App.module.scss';
import TopicsMenu from "./Menu/TopicsMenu";

function App() {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [photos, setPhotos] = useState([]);
    const [currentTopic, setCurrentTopic] = useState(null);
    const [pageNumber, setPageNumber] = useState(1); // Nieuwe state voor paginanummer

    // Haal willekeurig topic op bij eerste render
    useEffect(() => {
        const fetchRandomTopic = async () => {
            const topics = await getTopics();
            const randomTopic = topics[Math.floor(Math.random() * topics.length)];
            setCurrentTopic(randomTopic);
        };
        fetchRandomTopic();
    }, []);

    // Haal foto's op
    useEffect(() => {
        const fetchData = async () => {
            if (!currentTopic) return; // Wacht tot er een currentTopic is
            const endpoint = `topics/${currentTopic.id}/photos`;
            const photoData = await getPhotos(endpoint, 16, pageNumber); // Voeg paginanummer toe als parameter
            if (pageNumber === 1) {
                setPhotos(photoData);
            } else {
                setPhotos(prevPhotos => [...prevPhotos, ...photoData]);
            }
        };
        fetchData();
    }, [currentTopic, pageNumber]);


    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const handleSelectTopic = (selectedTopic) => {
        setCurrentTopic(selectedTopic);
    };

    return (
        <div>
            <TopicsMenu onSelectTopic={handleSelectTopic} />
            <h1 className={styles['topic-title']}>{currentTopic ? currentTopic.title : 'Loading...'}</h1>
            <div className={styles['center-container']}>
                <div className={styles['custom-container']}>
                    {photos.map((photo, index) => {
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

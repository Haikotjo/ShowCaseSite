import React, { useEffect, useState } from 'react';
import { getPhotos } from "./api";
import PhotoCard from "./PhotoCard/Photocard";
import styles from './App.module.scss';
import TitleComponent from "./Titel/Title";
import TopicsMenu from "./Menu/TopicsMenu";

function App() {
    const [photos, setPhotos] = useState([]);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [currentTopic, setCurrentTopic] = useState(null);


    useEffect(() => {
        const fetchData = async () => {
            try {
                let endpoint = 'photos/random';
                if (currentTopic) {
                    endpoint = `topics/${currentTopic.id}/photos`;
                }
                const photoData = await getPhotos(endpoint, 16);
                setPhotos(photoData);
            } catch (error) {
                console.log('Er ging iets mis: ', error);
            }
        };
        fetchData();
    }, [currentTopic]);


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

            {/*<TitleComponent />*/}
            <div className={styles['center-container']}>
                <div className={styles['custom-container']}>
                    {photos.map((photo, index) => {
                        const isFullWidth = windowWidth <= 767 ? true :
                            windowWidth <= 991 ? (index + 1) % 3 === 0 :
                                (index + 1) % 4 === 0;
                        return (
                            <div className={`${styles['custom-col']} ${isFullWidth ? styles['full-width-card'] : ''}`} key={index}>
                                <PhotoCard isFullWidth={isFullWidth} photoUrl={photo.urls.small} text={photo.alt_description || 'Geen beschrijving'} />
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default App;

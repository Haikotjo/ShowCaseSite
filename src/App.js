import React, { useEffect, useState } from 'react';
import { getPhotos } from "./api";
import PhotoCard from "./PhotoCard/Photocard";
import styles from './App.module.scss';
import TitleComponent from "./Titel/Title";

function App() {
    const [photos, setPhotos] = useState([]);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const photoData = await getPhotos('photos/random', 16); // Aangepast voor het voorbeeld
                setPhotos(photoData);
            } catch (error) {
                console.log('Er ging iets mis: ', error);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div>
            <TitleComponent />
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

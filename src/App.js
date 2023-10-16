import React, { useEffect, useState } from 'react';
import { getPhotos } from "./api";
import PhotoCard from "./PhotoCard/Photocard";
import styles from './App.module.scss';

function App() {
    const [photos, setPhotos] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const photoData = await getPhotos('photos/random', 12); // Aangepast voor het voorbeeld
                setPhotos(photoData);
            } catch (error) {
                console.log('Er ging iets mis: ', error);
            }
        };
        fetchData();
    }, []);

    return (
        <div className={styles['custom-container']}>
            {photos.map((photo, index) => (
                <>
                    <div className={styles['custom-col']} key={index}>
                        <PhotoCard photoUrl={photo.urls.small} text={photo.alt_description || 'Geen beschrijving'} />
                    </div>
                    {(index + 1) % 3 === 0 && (
                        <div className={`${styles['custom-col']} ${styles['full-width-card']}`} key={`wide-${index}`}>
                            <PhotoCard isFullWidth={true} photoUrl={photo.urls.small} text={photo.alt_description || 'Geen beschrijving'} />
                        </div>
                    )}
                </>
            ))}
        </div>
    );
}

export default App;

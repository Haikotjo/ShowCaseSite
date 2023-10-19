// PhotoCard.js
import React, { useState } from "react";
import styles from './Photocard.module.scss';
import InstagramModal from '../Component/Modal/Modal'; // Importeer het InstagramModal component

const PhotoCard = ({ photoUrl, largePhotoUrl, text, isFullWidth }) => {
    const [showMore, setShowMore] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const shortText = text.split(' ').slice(0, 5).join(' ');

    return (
        <div className={`${styles['custom-card']} ${isFullWidth ? styles['full-width'] : ''}`}>
            <div className={styles['custom-card-container']} onClick={() => setShowModal(true)}>
                <img src={photoUrl} className={styles['custom-card-img-top']} alt="..." />
            </div>
            <div className={styles['custom-card-body']}>
                <p className={styles['custom-card-text']}>
                    {isFullWidth ? text : (showMore ? text : shortText)}
                    {!isFullWidth && !showMore && (
                        <span onClick={() => setShowMore(true)} className={styles['clickable-ellipsis']}> >>></span>
                    )}
                </p>
            </div>
            <InstagramModal
                isOpen={showModal}
                closeModal={() => setShowModal(false)}
                largePhotoUrl={largePhotoUrl}
                text={text}
            />
        </div>
    );
};

export default PhotoCard;

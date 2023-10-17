import React, { useState } from "react";
import styles from './Photocard.module.scss';

const PhotoCard = ({ photoUrl, text, isFullWidth }) => {
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
            {showModal && (
                <div className={styles['modal']} onClick={() => setShowModal(false)}>
                    <div className={styles['modal-content']}>
                        <img src={photoUrl} alt="..." />
                        <p>{text}</p>
                    </div>
                </div>
            )}
        </div>
    );
};


export default PhotoCard;

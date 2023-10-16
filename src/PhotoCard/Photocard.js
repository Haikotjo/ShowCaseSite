import React, { useState } from "react";
import styles from './Photocard.module.scss';

const PhotoCard = ({ photoUrl, text, isFullWidth }) => {
    const [showMore, setShowMore] = useState(false);
    const shortText = text.split(' ').slice(0, 5).join(' ') + '...';

    return (
        <div className={`${styles['custom-card']} ${isFullWidth ? styles['full-width'] : ''}`}>
            <div className={styles['custom-card-container']}>
                <img src={photoUrl} className={styles['custom-card-img-top']} alt="..." />
            </div>
            <div className={styles['custom-card-body']}>
                <p className={styles['custom-card-text']}>{isFullWidth ? text : (showMore ? text : shortText)}</p>
                {!isFullWidth && (
                    <button className={styles['custom-btn']} onClick={() => setShowMore(!showMore)}>
                        {showMore ? 'Minder lezen' : 'Meer lezen'}
                    </button>
                )}
            </div>
        </div>
    );
}


export default PhotoCard;

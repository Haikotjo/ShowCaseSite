import React from 'react';
import styles from './Modal.module.scss';

const Modal = ({ isOpen, closeModal, largePhotoUrl, text }) => {
    if (!isOpen) return null;

    return (
        <div className={styles['modal']} onClick={closeModal}>
            <div className={styles['modal-content']} onClick={e => e.stopPropagation()}>
                <span className={styles['close-button']} onClick={closeModal}>&#x292C;</span>
                <img src={largePhotoUrl} alt="..." />
                <p className={styles['modal-text']}>{text}</p>
            </div>
        </div>
    );
};

export default Modal;

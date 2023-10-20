import React from 'react';
import styles from './Footer.module.scss';
import { FaLinkedin, FaGithub, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
    return (
        <div className={styles.footer}>
            <div className={styles.container}>
                <p>A project by Haiko Wierda</p>
                <div className={styles.links}>
                    <a href="https://www.linkedin.com/in/haiko-wierda-89aa7412a/" target="_blank" rel="noopener noreferrer">
                        <FaLinkedin />
                    </a>
                    <a href="https://github.com/Haikotjo" target="_blank" rel="noopener noreferrer">
                        <FaGithub />
                    </a>
                    <a href="mailto:haikowierda@hotmail.com">
                        <FaEnvelope />
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Footer;

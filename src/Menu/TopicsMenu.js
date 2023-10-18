import React, { useEffect, useState } from 'react';
import { getTopics } from '../api';
import styles from './TopicsMenu.module.scss'; // Vergeet niet om je SCSS-bestand te importeren

const TopicsMenu = ({ onSelectTopic }) => {
    const [topics, setTopics] = useState([]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);


    useEffect(() => {
        const fetchTopics = async () => {
            try {
                const topicsData = await getTopics();
                setTopics(topicsData);
            } catch (error) {
                console.log('Er ging iets mis: ', error);
            }
        };
        fetchTopics();
    }, []);

    return (
        <div className={styles['menu-container']}>
            <div className={styles.hamburger} onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                <div></div>
                <div></div>
                <div></div>
            </div>
            <ul className={`${styles['menu-list']} ${isDropdownOpen ? styles['open'] : ''}`}>
                {topics.map((topic) => (
                    <li
                        className={styles['menu-item']}
                        key={topic.id}
                        onClick={() => {
                            onSelectTopic(topic);
                            setIsDropdownOpen(false);  // Dit sluit het menu
                        }}
                    >
                        {topic.title}
                    </li>
                ))}
            </ul>
        </div>
    );

};

export default TopicsMenu;

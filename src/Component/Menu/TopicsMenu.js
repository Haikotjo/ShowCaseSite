import React, { useEffect, useState } from 'react';
import { getTopics } from '../../api';
import styles from './TopicsMenu.module.scss';

const TopicsMenu = ({ onSelectTopic }) => {
    const [topics, setTopics] = useState([]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [activeTopic, setActiveTopic] = useState(null);

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
                        className={`${styles['menu-item']} ${activeTopic === topic.id ? styles['active'] : ''}`}
                        key={topic.id}
                        onClick={() => {
                            onSelectTopic(topic);
                            setActiveTopic(topic.id);
                            setIsDropdownOpen(false);
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

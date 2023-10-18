import React, { useEffect, useState } from 'react';
import { getTopics } from '../api';

const TopicsMenu = ({ onSelectTopic }) => {
    const [topics, setTopics] = useState([]);

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
        <div>
            <ul>
                {topics.map((topic) => (
                    <li key={topic.id} onClick={() => onSelectTopic(topic)}>
                        {topic.title}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TopicsMenu;

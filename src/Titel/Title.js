import React, { useState, useEffect } from 'react';
import './Title.module.scss';

const fonts = ['Arial', 'Courier New', 'Georgia', 'Times New Roman', 'Verdana'];

const TitleComponent = () => {
    const [currentFontIndex, setCurrentFontIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentFontIndex(prevIndex => (prevIndex + 1) % fonts.length);
        }, 5000); // Verander elke 5 seconden

        return () => clearInterval(interval); // Opruimen
    }, []);

    return (
        <h1 style={{ fontFamily: fonts[currentFontIndex] }} className="animated-title">
            Showcase
        </h1>
    );
};

export default TitleComponent;

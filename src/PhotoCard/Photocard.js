import React, { useState } from "react";

const PhotoCard  = ({ photoUrl, text }) => {
    const [showMore, setShowMore] = useState(false);
    const shortText = text.split(' ').slice(0, 5).join(' ') + '...';

    return (
        <div className = "card" style={{width: '18rem'}}>
            <img src={photoUrl} className="card-img-top" alt="..."/>
            <div className="card-body">
                <p className="card-text">{showMore ? text : shortText }</p>
                <button className="btn btn-primary" onClick={() => setShowMore(!showMore)}>
                    {showMore ? 'Minder lezen' : 'Meer lezen'}
                </button>
            </div>
        </div>
    )
}

export default PhotoCard;
import React, { useState } from "react";

const PhotoCard  = ({ photoUrl, text }) => {
    const [showMore, setShowMore] = useState(false);
    const shortText = text.split(' ').slice(0, 5).join(' ') + '...';

    return (
        <div className="card d-flex flex-column" style={{ width: '18rem' }}>
            <div style={{ height: '200px', overflow: 'hidden' }}>
                <img src={photoUrl} className="card-img-top" alt="..." style={{ objectFit: 'cover', height: '100%', width: '100%' }} />
            </div>
            <div className="card-body flex-grow-1">
                <p className="card-text">{showMore ? text : shortText}</p>
                <button className="btn btn-primary" onClick={() => setShowMore(!showMore)}>
                    {showMore ? 'Minder lezen' : 'Meer lezen'}
                </button>
            </div>
        </div>
    )
}

export default PhotoCard;
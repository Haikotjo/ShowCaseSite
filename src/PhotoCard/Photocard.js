import React, { useState } from "react";
import './Photocard.module.scss'

const PhotoCard  = ({ photoUrl, text }) => {
    const [showMore, setShowMore] = useState(false);
    const shortText = text.split(' ').slice(0, 5).join(' ') + '...';

    return (
        <div className="card d-flex flex-column text-bg-dark p-3 rounded-4" style={{ width: '18rem' }} >
            <div className="card-container rounded-4" >
                <img src={photoUrl} className="card-img-top rounded" alt="..."  />
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
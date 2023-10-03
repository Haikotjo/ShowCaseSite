import React, {useEffect, useState} from 'react';
import {getPhotos} from "./api";
import PhotoCard from "./PhotoCard/Photocard";


function App() {
    const [photos, setphotos] = useState([])

    useEffect(()=>{
        const fetchData = async () => {
            try {
                const photoData = await getPhotos('photos/random', 10);
                setphotos(photoData)
            } catch (error) {
                console.log('Er ging iets mis: ', error)
            }
        };
        fetchData();
    }, []);

  return (
      <div className="container">
        <div className="row">
            {photos.map((photo, index) => (
                <div className="col-md-4" key={index}>
                    <PhotoCard photoUrl={photo.urls.small} text={photo.alt_description || 'Geen beschrijving'} />
                </div>
            ))}
        </div>
      </div>
  );
}

export default App;

import React, { useState, useEffect } from 'react';
import { getTrackData } from './deezer';

function Grooovz_player() {
  const [trackData, setTrackData] = useState(null);

  useEffect(() => {
    getTrackData()
      .then(data => {
        setTrackData(data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  if (!trackData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{trackData.title}</h1>
      <p>{trackData.artist.name}</p>
      <img src={trackData.album.cover_medium} alt={trackData.album.title} />
      <audio controls>
        <source src={trackData.preview} type="audio/mp3" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
}

export default Grooovz_player;


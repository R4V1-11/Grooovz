import React from 'react';

function Playbar({ songTitle, artist }) {
  return (
    <div className="playbar-container">
      <div className="playbar-song-info">
        <p className="playbar-song-title">{songTitle}</p>
        <p className="playbar-song-artist">{artist}</p>
      </div>
      {/* ... other playbar components ... */}
    </div>
  );
}

export default Playbar;

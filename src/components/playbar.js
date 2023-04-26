import React from 'react';
import './playbar.css';
import Icon from '@mdi/react';
import { mdiPlayCircle, mdiPauseCircle } from '@mdi/js';

function Playbar({ songImage, songTitle, artist, onPlay, onPause, isPlaying, CurrentTime, setCurrentTrackTime, duration }) {
  const handlePlay = () => {
    onPlay(); // Call the onPlay prop function
  };

  const handlePause = () => {
    onPause(); // Call the onPause prop function
  };

  const handleSliderChange = (e) => {
    const value = parseInt(e.target.value);
    setCurrentTrackTime(value);
  };

  // Helper function to format time in MM:SS format
  const formatTime = (time) => {
    if (isNaN(time)) {
      return '0:00'; // Return a default value if time is not a valid number
    }
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
  };

  return (
    <div className="playbar-container">
      <div className="playbar-song-info">
        <img className="playbar-song-image" src={songImage} alt="Album cover of the current song" />
        <p className="playbar-song-title">{songTitle}</p>
        <p className="playbar-song-artist">{artist}</p>
      </div>
      <div className="playbar-controls">
        <div className='playpausebuttons'>
        {isPlaying ? (
          <Icon className = "playbutton" path={mdiPauseCircle} size={2} onClick={handlePause} /> // Use handlePause for pause button
        ) : (
          <Icon className = "pausebutton" path={mdiPlayCircle} size={2} onClick={handlePlay} /> // Use handlePlay for play button
        )}
        </div>
        
        <p className="playbar-start-time">{formatTime(CurrentTime)}</p> {/* Display formatted start time */}
          <input
          type="range"
          className="playbar-slider"
          min={0}
          max={duration}
          value={CurrentTime}
          onChange={handleSliderChange}
          />
          <p className="playbar-duration">{formatTime(duration)}</p>
      </div>
    </div>
  );
}

export default Playbar;

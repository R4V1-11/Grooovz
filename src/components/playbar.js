import React  from 'react';
import './playbar.css';
import Icon from '@mdi/react';
import { mdiPlayCircle, mdiPauseCircle } from '@mdi/js';
import { useEffect } from 'react';

function Playbar({ songImage, songTitle, artist, onPlay, onPause, isPlaying, currentTime, setCurrentTrackTime, duration }) {
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
      //console.log("the current time was passed here");
      return '0:00'; // Return a default value if time is not a valid number
    }
    //console.log('C time:', time);
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
    
  };
  useEffect(() => {
    setCurrentTrackTime(0);
  }, [songTitle]);
  return (
    <div className="playbar-container" >
        <div className="playbar-song-details">
              <img className="playbar-song-image" src={songImage} alt="Album cover of the current song" />
              <div className='playbar-song-text'>
                  <p className="playbar-song-title">{songTitle}</p>
                  <p className="playbar-song-artist">{artist}</p>
              </div>
        </div>
        <div className="playbar-controls">
          <p className="playbar-current-time">{formatTime(currentTime)}</p>
            <input
             type="range"
             className="playbar-slider"
             min={0}
             max={duration}
             value={currentTime}
             onChange={handleSliderChange}
            />
           <p className="playbar-duration">{formatTime(duration)}</p>
            
            <div className='playpausebuttons'>
            {isPlaying ? (
              <Icon className = "playbutton" path={mdiPauseCircle} size={2} onClick={handlePause} /> // Use handlePause for pause button
            ) : (
              <Icon className = "pausebutton" path={mdiPlayCircle} size={2} onClick={handlePlay} /> // Use handlePlay for play button
            )}
            </div>
        </div>
    </div>
  );
}

export default Playbar;

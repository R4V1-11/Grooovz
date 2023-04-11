import React from 'react';
import Icon from '@mdi/react';
import { mdiPlay, mdiPause } from '@mdi/js';

const PlayBar = ({ play, onPlayPauseClick }) => {
  return (
    <div className="play-bar" style={{ backgroundColor: 'black', position: 'fixed', bottom: 0, left: 0, right: 0 }}>
      <div className="controller">
        <div>
          <progress value="0" max="100"></progress>
        </div>
        <div>
          <button className="Play-Button" onClick={onPlayPauseClick}>
            <Icon path={play ? mdiPause : mdiPlay} size={1} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlayBar;

import React, { useState, useEffect } from 'react';
import './Grooovz_player.css';
import { Link } from 'react-router-dom';
import Icon from '@mdi/react';
import { mdiPlay, mdiPause } from '@mdi/js';
import { useLocation } from 'react-router-dom';
import { searchSong} from './deezer';
import PlayBar from './playbar.js';

function Grooovz_player() {
  const [click, setClick] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const location = useLocation();

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [play, setPlay] = useState(false);
  const [audio, setAudio] = useState(new Audio());


  function pauseTrack(trackId) {
    const track = searchResults.find((t) => t.id === trackId);
    if (track && track.audio) {
      track.audio.pause();
    }
  };

  

 return (
    <>
      {(location.pathname !== '/sign-up' || location.pathname !== '/login' || location.pathname !== '/') ? (
        <div>
          <nav className="navbar">
            <div className="navbar-container">
              <Link to="/grooovz" className="navbar-logo" onClick={closeMobileMenu}>
                GROOOOVZ
                <i className="fab fa-typo3" />
              </Link>
              <div className="menu-icon" onClick={handleClick}>
                <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
              </div>
              <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                <li className="nav-item">
                  <Link to="/grooovz" className="nav-links" onClick={closeMobileMenu}>
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/account" className="nav-links" onClick={closeMobileMenu}>
                    Account
                  </Link>
                </li>
                <li>
                  <Link to="/library" className="nav-links-mobile" onClick={closeMobileMenu}>
                    Library
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
          
          <div className="track-container">
            {searchResults.map((track) => (
              <div key={track.id} className="track-item">
                <img src={track.album.cover_small} alt={track.title} className="track-item-img" />
                <div className="track-item-info">
                  <p className="track-item-title">{track.title}</p>
                  <p className="track-item-artist">{track.artist.name}</p>
                </div>
                <div className="playbar">
                  {currentTrack && currentTrack.id === track.id && (
                    <Icon
                      path={play ? mdiPause : mdiPlay}
                      size={1}
                      className="track-item-play-pause"
                      onClick={() => setPlay(!play)}
                    />
                  )}
                  {currentTrack && currentTrack.id !== track.id && (
                    <Icon
                      path={mdiPlay}
                      size={1}
                      className="track-item-play-pause"
                      onClick={() => {
                        pauseTrack(currentTrack.id);
                        setCurrentTrack(track);
                        setPlay(true);
                      }}
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
          
        </div>
      ) : null}
    </>
  );
}

export default Grooovz_player;

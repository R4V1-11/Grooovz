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

  const searchSong = (query) => {
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': 'c7d3fd8ef1mshf2f9a69b487015ap14e363jsn91d71f5e575f',
        'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com'
      }
    };
  
    fetch(`https://deezerdevs-deezer.p.rapidapi.com/search?q=${query}`, options)
      .then(response => response.json())
      .then(response => {
        console.log(response);
        const songs = response.data;
        setSearchResults(songs); // Update search results state with retrieved songs
      })
      .catch(err => console.error(err));
  };

  const playSong = (previewUrl) => {
    const audio = new Audio(previewUrl);
    audio.play();
  };
  
  const handleSearchInputChange = (event) => {
    const query = event.target.value;
    setSearchTerm(query);
  };
  
  const handleSearchInputKeyPress = (event) => {
    if (event.key === 'Enter') {
      searchSong(searchTerm);
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
          <div className="search-container">
              <input
                    type="search"
                    className="search-input"
                    placeholder="Search for songs..."
                    value={searchTerm}
                    onChange={handleSearchInputChange}
                    onKeyPress={handleSearchInputKeyPress}
              />
              <ul className="search-results">
            {searchResults.map((song) => (
              <li key={song.id} className="search-result-item">
                <h1 className="search-result-title">{song.title}</h1>
                <p>Artist: {song.artist.name}</p>
                <p>Album: {song.album.title}</p>
                <img src={song.album.cover_medium} alt="Album Cover"></img>
                <audio src={song.preview} controls></audio>
              </li>
            ))}
          </ul>
                            </div>
                          <div className="playbar-container">
                            <PlayBar />
                          </div>
                        </div>
                      ) : null}
                    </>
                  );
                }
                
                export default Grooovz_player;
                

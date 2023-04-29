import React, { useState, useEffect } from 'react';
import './Grooovz_player.css';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Playbar from './playbar'
import Icon from '@mdi/react';
import { mdiPlaylistMusic,mdiPlus } from '@mdi/js';
import genres from './genres.json';



function Grooovz_player() {
  const [click, setClick] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const location = useLocation();
  const [currentTrack, setCurrentTrack] = useState(null);
  const [play, setPlay] = useState(false);
  const [playbar,setPlaybar] = useState(true);
  const [queue, setQueue] = useState([]);
  const [message,showMessage] = useState(false)
  

  const handleGenreClick = (genre) => {
    setSearchTerm(genre.name); // Set the search term to the name of the genre
    searchSong(genre.name); // Search for the name of the genre
  };

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

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
        const songs = response.data.map(song => ({ ...song, play: false }));
        setSearchResults(songs); // Update search results state with retrieved songs
      })
      .catch(err => console.error(err));
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

  const [audio, setAudio] = useState(new Audio());
  const [currentTrackTime, setCurrentTrackTime] = useState(0);
  
  const handleSearchResultClick = (track) => {
    if (currentTrack !== track) {
      setCurrentTrackTime(0);
      let currentTrackTime = 0; // Reset current track time to 0 when clicking on a new track
      setCurrentTrack(track);
    }
    if (play === false) {
      audio.src = track?.preview;
      audio.currentTime = currentTrackTime; // Set current track time
      audio.play();
      setPlay(true);
      
    } else {
      audio.pause();
      setPlay(false);
    }
  };
  
  // Update current track time while the track is playing
  audio.addEventListener("timeupdate", () => {
    setCurrentTrackTime(audio.currentTime);
    //console.log(currentTrackTime);
  });
  
  const handleSliderChange = (value) => {
    setCurrentTrackTime(value);
    audio.currentTime = value;
  
  }
  
  const handleAddToQueue = (song) => {
  setQueue([...queue, song]);
  console.log('Adding to queue:', song);
  showMessage(true); // Set showMessage to true when "addToQueue" is clicked
    setTimeout(() => {
      showMessage(false); // Set showMessage back to false after a few seconds
    }, 3000);

  };

  useEffect(() => {
    // Play next song in the queue when the current song ends
    audio.addEventListener("ended", () => {
      const queueCopy = [...queue];
      if (queueCopy.length > 0) {
        const nextSong = queueCopy.shift(); // Add missing parentheses here
        if (nextSong) {
          setCurrentTrackTime(0); // Reset current track time to 0 for the next song
          setCurrentTrack(nextSong);
          audio.src = nextSong.preview;
          audio.play();
          setPlay(true);
          setQueue(queueCopy);
        } else {
          setCurrentTrack(null);
          setPlay(false);
          setQueue([]);
        }
      }
    });
    
  
    // Clean up event listeners when component unmounts
    return () => {
      audio.removeEventListener("timeupdate", () => {
        setCurrentTrackTime(audio.currentTime);
      });
      audio.removeEventListener("ended", () => {
        const queueCopy = [...queue];
        if (queueCopy.length > 0) {
          const nextSong = queueCopy.shift();
          if (nextSong) {
            setCurrentTrackTime(0); // Reset current track time to 0 for the next song
            setCurrentTrack(nextSong);
            audio.src = nextSong.preview;
            audio.play();
            setPlay(true);
            setQueue(queueCopy);
          } else {
            setCurrentTrack(null);
            setPlay(false);
            setQueue([]);
          }
        }
      });
    };
  }, [queue, currentTrack, audio]);
  useEffect(() => {
    if (currentTrack) {
      setPlaybar(true);
    }
  }, [currentTrack]);
  return (
    <>
      {(location.pathname !== '/sign-up' || location.pathname !== '/login' || location.pathname !== '/') ? (
        <div className='entire'>
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
                  <Link to="/grooovz/playlist" className="nav-links" onClick={closeMobileMenu}>
                    Playlist
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/grooovz/favorites" className="nav-links" onClick={closeMobileMenu}>
                    Favorites
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/grooovz/settings" className="nav-links" onClick={closeMobileMenu}>
                    Settings
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
          
          <div className="grooovz-player-container">
            <div className="grooovz-player">
              <div className="search-bar">
                <input
                  type="text"
                  placeholder="Search songs..."
                  className="search-input"
                  value={searchTerm}
                  onChange={handleSearchInputChange}
                  onKeyPress={handleSearchInputKeyPress}
                />
              </div>
              <div className="search-results">
                {searchResults.map((track) => (
                  <div className="search-result" key={track.id}>
                    <img src={track.album.cover_medium} alt={track.title} className="search-result-img" onClick={() => handleSearchResultClick(track)} />
                      <div className="search-result-info">
                      <p className="search-result-title">{track.title}</p>
                      <p className="search-result-artist">{track.artist.name}</p>
                    </div>
                    <div className="search-result-controls">
                      <Icon className = "playlistIcon" path ={mdiPlaylistMusic} size={2} />
                      <Icon className = "addqueueIcon" path ={mdiPlus} size={2} onClick ={()=>handleAddToQueue(track)}/>
                    </div>
                  </div>
                ))}
              </div>
          <div className="genres-container">
           {genres.map((genre) => (
            <div className="genre-card" key={genre.id}>
            <img className="genre-image" src={require(`${genre.image}`)} alt="genre" onClick={() => handleGenreClick(genre)} />

            <div className='genre-result-info'>
              <p className='genre-name'>{genre.name}</p>
            </div>
          </div>
           ))}
          </div>
              { currentTrack && playbar && (
              <div className='playbar'>
              <Playbar
                songImage={currentTrack ? currentTrack.album.cover_medium : 'no image'}
                songTitle={currentTrack ? currentTrack.title : ''}
                artist={currentTrack ? currentTrack.artist.name : ''}
                isPlaying = {play}
                onPlay={() => handleSearchResultClick(currentTrack)}
                onPause={() => handleSearchResultClick(currentTrack)}
                currentTime={currentTrackTime}
                setCurrentTrackTime={handleSliderChange}
                duration={audio.duration}
              />
               </div>)}
          </div>
            
          </div>
          {showMessage && (
           <div className="message">
             Added to queue
           </div>
          )}
        </div>
      ) : (
        null
      )}
    </>
  );
}

export default Grooovz_player;

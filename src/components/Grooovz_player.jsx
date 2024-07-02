import React, { useState, useEffect, useRef } from 'react';
import './Grooovz_player.css';
import { useNavigate } from 'react-router-dom';
import Playbar from './playbar';
import Icon from '@mdi/react';
import { mdiPlaylistMusic, mdiPlus } from '@mdi/js';
import genres from './genres.json';
import Navbar2 from './Navbar2';

function Grooovz_player() {
 const [searchTerm, setSearchTerm] = useState("");
 const [searchResults, setSearchResults] = useState([]);
 const [currentTrack, setCurrentTrack] = useState(null);
 const [play, setPlay] = useState(false);
 const [playbar, setPlaybar] = useState(true);
 const [queue, setQueue] = useState([]);
 const audio = useRef(new Audio()); // Correctly using useRef
 const [currentTrackTime, setCurrentTrackTime] = useState(0);
 const navigate = useNavigate();
 const [tokenExists, setTokenExists] = useState(true);

 useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setTokenExists(false);
      navigate('/login', { replace: true });
    }
 }, []);

 const handleGenreClick = (genre) => {
    setSearchTerm(genre.name);
    searchSong(genre.name);
 };

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
        const songs = response.data.map(song => ({ ...song, play: false }));
        setSearchResults(songs);
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

 const handleSearchResultClick = (track) => {
    if (!currentTrack) {
      setCurrentTrack(track);
    }

    if (track) {
      if (currentTrack !== track) {
        setCurrentTrackTime(0);
        setCurrentTrack(track);
        audio.current.src = track?.preview;
        audio.current.play();
        setPlay(false);
      } else {
        audio.current.pause();
        setPlay(false);
      }
    }

    if (play === false) {
      audio.current.src = track?.preview;
      audio.current.currentTime = currentTrackTime;
      audio.current.play();
      setPlay(true);
    } else {
      audio.current.pause();
      setPlay(false);
    }
 };

 const handleSliderChange = (value) => {
    setCurrentTrackTime(value);
    audio.current.currentTime = value;
 };

 const handleAddToQueue = (song) => {
    setQueue([...queue, song]);
    console.log('Adding to queue:', song);
 };

 useEffect(() => {
    const handleTimeUpdate = () => {
      setCurrentTrackTime(audio.current.currentTime);
    };

    const handleEnded = () => {
      const queueCopy = [...queue];
      if (queueCopy.length > 0) {
        const nextSong = queueCopy.shift();
        if (nextSong) {
          setCurrentTrackTime(0);
          setCurrentTrack(nextSong);
          audio.current.src = nextSong.preview;
          audio.current.play();
          setPlay(true);
          setQueue(queueCopy);
        } else {
          setCurrentTrack(null);
          setPlay(false);
          setQueue([]);
        }
      }
    };

    audio.current.addEventListener("timeupdate", handleTimeUpdate);
    audio.current.addEventListener("ended", handleEnded);

    return () => {
      audio.current.removeEventListener("timeupdate", handleTimeUpdate);
      audio.current.removeEventListener("ended", handleEnded);
    };
 }, [queue, currentTrack, audio]);

 useEffect(() => {
    if (currentTrack) {
      setPlaybar(true);
    }
 }, [currentTrack]);

 if (!tokenExists) {
    return null;
 }

 return (
    <div>
      <Navbar2 />
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
                <Icon className="playlistIcon" path={mdiPlaylistMusic} size={2} />
                <Icon className="addqueueIcon" path={mdiPlus} size={2} onClick={() => handleAddToQueue(track)} />
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
        <div>
          {currentTrack !== null && playbar && (
            <div className='playbar'>
              <Playbar
                songImage={currentTrack ? currentTrack.album.cover_medium : 'no image'}
                songTitle={currentTrack ? currentTrack.title : ''}
                artist={currentTrack ? currentTrack.artist.name : ''}
                isPlaying={play}
                onPlay={() => handleSearchResultClick(currentTrack)}
                onPause={() => handleSearchResultClick(currentTrack)}
                currentTime={currentTrackTime}
                setCurrentTrackTime={handleSliderChange}
                duration={audio.current.duration}
              />
            </div>
          )}
        </div>
      </div>
    </div>
 );
}

export default Grooovz_player;

import { useState } from 'react';
import Icon from '@mdi/react';
import { mdiMagnify } from '@mdi/js';
import { playTrackByName } from './deezer';

function SearchBar() {
  const [query, setQuery] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    playTrackByName(query);
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search for a track"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />
      <button type="submit">
        <Icon path={mdiMagnify} size={1} />
      </button>
    </form>
  );
}

export default SearchBar;

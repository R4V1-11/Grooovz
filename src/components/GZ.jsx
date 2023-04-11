import React, { useState } from "react";
import JamendoAPI from "./jamendo";

const api = new JamendoAPI();

function GZ() {
  const [query, setQuery] = useState("");

  const handleSearch = (event) => {
    event.preventDefault();
    api.searchTrack(query);
  };

  const handlePlay = () => {
    api.playTrack();
  };

  const handlePause = () => {
    api.pauseTrack();
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <label>
          Search:
          <input
            type="text"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </label>
        <button type="submit">Search</button>
      </form>
      <button onClick={handlePlay}>Play</button>
      <button onClick={handlePause}>Pause</button>
    </div>
  );
}

export default GZ;

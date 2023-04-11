class JamendoAPI {
    constructor() {
      this.baseURL = "https://api.jamendo.com/v3.0";
      this.clientID = "430ddc31"; // Replace with your Jamendo API client ID
      this.audio = new Audio();
      this.audio.onerror = (error) => console.error(error);
    }
  
    searchTrack(query) {
      const url = `${this.baseURL}/tracks/?client_id=${this.clientID}&search=${query}&limit=10`;
      return fetch(url)
        .then((response) => response.json())
        .then((data) => {
          const track = data.results[0];
          if (track) {
            this.audio.src = track.audio;
            console.log('Audio object before play:', this.audio);
            this.audio.play();
            console.log('Audio object after play:', this.audio);
            return track;
          }
          return null;
        })
        .catch((error) => console.error(error));
    }
  
    playTrack() {
      console.log('Audio object before play:', this.audio);
      this.audio.play();
      console.log('Audio object after play:', this.audio);
    }
  
    pauseTrack() {
      this.audio.pause();
    }
  }
  
  export default JamendoAPI;
  
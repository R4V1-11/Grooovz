import axios from 'axios';

const baseUrl = 'https://api.deezer.com/';
const appId = '4280733';

export const getTrackData = () => {
  return axios.get(`${baseUrl}search?q=track:"Shape of You"&limit=1&app_id=${appId}`)
    .then(response => {
      return response.data.data[0];
    })
    .catch(error => {
      console.error(error);
      throw new Error('Failed to get track data');
    });
}

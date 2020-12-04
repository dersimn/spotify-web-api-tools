import SpotifyWebApi from 'spotify-web-api-node';
import SpotifyWebApiTools from '../../index.js';

const spotifyApi = new SpotifyWebApi();
const swat = new SpotifyWebApiTools(spotifyApi);

spotifyApi.setAccessToken(process.env.SPOTIFY_ACCESS_TOKEN);

(async () => {
    const playlistArray = await swat.getAllUserPlaylists();

    const playlistNames = playlistArray.map(p => p.name);
    console.log(playlistNames);
})().catch(error => {
    console.error(error);
});

import {SpotifyWebApiAutoReAuth} from '../../index.js';

const spotifyApi = new SpotifyWebApiAutoReAuth();
spotifyApi.setClientId(process.env.SPOTIFY_CLIENT_ID);
spotifyApi.setClientSecret(process.env.SPOTIFY_CLIENT_SECRET);
spotifyApi.setRefreshToken(process.env.SPOTIFY_REFRESH_TOKEN);
spotifyApi.setAccessToken(process.env.SPOTIFY_ACCESS_TOKEN);

(async () => {
    const me = (await spotifyApi.getMe()).body;
    console.log(me);
})().catch(error => {
    console.error(error);
});

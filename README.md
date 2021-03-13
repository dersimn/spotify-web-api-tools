Tools for [spotify-web-api-node](https://github.com/thelinmichael/spotify-web-api-node) to make life easier. See [`/examples`](/examples) for examples.

## tl;dr

```javascript
import SpotifyWebApi from 'spotify-web-api-node';
import SpotifyWebApiTools from 'spotify-web-api-tools';

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
```
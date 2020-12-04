import SpotifyWebApi from 'spotify-web-api-node';
import express from 'express';

const scopes = [
    'ugc-image-upload',
    'user-read-playback-state',
    'user-modify-playback-state',
    'user-read-currently-playing',
    'streaming',
    'app-remote-control',
    'user-read-email',
    'user-read-private',
    'playlist-read-collaborative',
    'playlist-modify-public',
    'playlist-read-private',
    'playlist-modify-private',
    'user-library-modify',
    'user-library-read',
    'user-top-read',
    'user-read-playback-position',
    'user-read-recently-played',
    'user-follow-read',
    'user-follow-modify'
];

const spotifyApi = new SpotifyWebApi({
    redirectUri: 'http://localhost:8888/callback',
    clientId: process.argv.slice(2)[0],
    clientSecret: process.argv.slice(2)[1]
});

const app = express();

app.get('/login', (request, response) => {
    response.redirect(spotifyApi.createAuthorizeURL(scopes));
});

app.get('/callback', async (request, response) => {
    const error = request.query.error;
    const code = request.query.code;

    if (error) {
        console.error('Callback Error:', error);
        response.send(`Callback Error: ${error}`);
        return;
    }

    try {
        const codes = (await spotifyApi.authorizationCodeGrant(code)).body;

        const accessToken = codes.access_token;
        const refreshToken = codes.refresh_token;
        const expiresIn = codes.expires_in;

        spotifyApi.setAccessToken(accessToken);
        spotifyApi.setRefreshToken(refreshToken);

        console.log('Access Token:', accessToken);
        console.log('Refresh Token:', refreshToken);

        console.log(
            `Sucessfully retreived access token. Expires in ${expiresIn} s.`
        );
        response.send('Success! You can now close the window.');

        setInterval(async () => {
            const data = await spotifyApi.refreshAccessToken();
            const accessToken = data.body.access_token;

            console.log('The access token has been refreshed!');
            console.log('New Access Token:', accessToken);
            spotifyApi.setAccessToken(accessToken);
        }, expiresIn / 2 * 1000);
    } catch (error) {
        console.error('Error getting Tokens:', error);
        response.send(`Error getting Tokens: ${error}`);
    }
});

app.listen(8888, () =>
    console.log(
        'HTTP Server up. Now go to http://localhost:8888/login in your browser.'
    )
);

Execute all commands from the root folder of this repository.

Start with

    git clone <this repo url>
    cd spotify-web-api-tools
    npm install
    node examples/00-get-access-token.js <Client ID> <Client Secret>

and visit <http://localhost:8888/login> in your browser.  
If you don't have a Client ID and Client Secret yet, create an application here: <https://developer.spotify.com/my-applications> to get them. Make sure you whitelist the correct redirectUri when creating your application, which is `http://localhost:8888/callback`.

After you got an Access Token, call all other examples with this token in ENV variable `SPOTIFY_ACCESS_TOKEN`. The easiest way is to copy & paste the output from `examples/00-get-access-token.js` into the Terminal:

    export SPOTIFY_CLIENT_ID="..."
    export SPOTIFY_CLIENT_SECRET="..."
    export SPOTIFY_ACCESS_TOKEN="..."
    export SPOTIFY_REFRESH_TOKEN="..."

After that run the examples:

    node examples/01-basics/01-get-info-about-current-user.js

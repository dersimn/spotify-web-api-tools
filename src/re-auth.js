import SpotifyWebApi from 'spotify-web-api-node';

const SpotifyWebApiAutoReAuth = function () {
    return new Proxy(new SpotifyWebApi(), {
        get(target, property) {
            if (typeof target[property] === 'function') {
                if (target.getClientId() && target.getClientSecret() && target.getRefreshToken()) {
                    return function (...args) {
                        const result = target[property](...args);

                        if (result instanceof Promise) {
                            return new Promise((resolve, reject) => {
                                result
                                    .then((...args) => {
                                        resolve(...args);
                                    })
                                    .catch(async error => {
                                        if (error.statusCode === 401 && error.body.error.message === 'The access token expired') {
                                            const data = await target.refreshAccessToken();
                                            const accessToken = data.body.access_token;

                                            target.setAccessToken(accessToken);

                                            resolve(target[property](...args));
                                        } else {
                                            reject(error);
                                        }
                                    });
                            });
                        }

                        return result;
                    };
                }

                return target[property];
            }

            return target[property];
        }
    });
};

export default SpotifyWebApiAutoReAuth;

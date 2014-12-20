var OAuth2 = require( 'oauth' ).OAuth2,
    config = require( '../../config' );

module.exports.oauth = {
    client: new OAuth2(
        config.github.clientId,
        config.github.clientSecret,
        'https://github.com/',
        'login/oauth/authorize',
        'login/oauth/access_token',
        null
    ),
    scope: [ 'repo', 'user' ]
};
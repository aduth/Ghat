var request = require( 'superagent' ),
    OAuth2 = require( 'oauth' ).OAuth2,
    config = require( '../../config' ),
    oauth;

oauth = module.exports.oauth = {
    client: new OAuth2(
        config.github.clientId,
        config.github.clientSecret,
        'https://github.com/',
        'login/oauth/authorize',
        'login/oauth/access_token',
        null
    ),
    scope: [ 'write:repo_hook' ]
};

module.exports.getMyAvatar = function( token, next ) {
    request.get( 'https://api.github.com/user' )
        .set({ Authorization: 'token ' + token })
        .end(function( err, res ) {
            err = err || res.error;

            var avatar;
            if ( ! err ) {
                avatar = res.body.avatar_url;
            }

            next( err, avatar );
        });
};

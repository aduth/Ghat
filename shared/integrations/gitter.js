var request = require( 'superagent' ),
    OAuth2 = require( 'oauth' ).OAuth2,
    config = require( '../../config' );

module.exports.oauth = {
    client: new OAuth2(
        config.gitter.clientId,
        config.gitter.clientSecret,
        'https://gitter.im/',
        'login/oauth/authorize',
        'login/oauth/token',
        null
    ),
    query: { response_type: 'code' }
};

module.exports.name = 'Gitter';

/**
 * Given an OAuth token and callback, invokes a network request to Gitter to
 * verify that the token is still valid.
 *
 * @param {string}   token A Gitter OAuth2 token
 * @param {Function} next  A callback to trigger when the request finishes
 */
module.exports.verify = function( token, next ) {
    request.get( 'https://api.gitter.im/v1/user' )
        .set({ 'x-access-token': token })
        .end(function( err, res ) { /* jshint ignore:line */
            next( err );
        });
};

/**
 * Given an OAuth token, message, channel, and callback, invokes a network
 * request to Gitter to send the desired message.
 *
 * @param {string}   token   A valid Gitter OAuth2 token
 * @param {string}   message A Gitter message
 * @param {string}   channel A Gitter room ID
 * @param {Function} next    A callback to trigger when the request finishes
 */
module.exports.sendMessage = function( message, channel, token, next ) {
    request.post( 'https://api.gitter.im/v1/rooms/' + channel + '/chatMessages' )
        .set({
            'x-access-token': token,
            text: message
        })
        .end(function( err, res ) {
            next( err, res );
        });
};

/**
 * Given an OAuth token and callback, invokes a network request to Gitter to
 * request the profile information for the user associated with the token.
 *
 * @param {string}   token  A valid Gitter OAuth2 token
 * @param {Function} next   A callback to trigger when the request finishes
 */
module.exports.getMyProfile = function( token, next ) {
    request.get( 'https://api.gitter.im/v1/user' )
        .set({ 'x-access-token': token })
        .end(function( err, res ) {
            var profile;
            if ( ! err && Array.isArray( res.body ) && res.body.length ) {
                profile = {
                    username: res.body[0].username,
                    avatar: res.body[0].avatarUrlMedium
                };
            }

            next( err, profile );
        });
};

/**
 * Given an OAuth token and callback, invokes a network request to Gitter to
 * request the available contacts associated with the token.
 *
 * @param {string}   token  A valid Gitter OAuth2 token
 * @param {Function} next   A callback to trigger when the request finishes
 */
module.exports.getContacts = function( token, next ) {
    request.get( 'https://api.gitter.im/v1/rooms' )
        .set({ 'x-access-token': token })
        .end(function( err, res ) {
            var contacts;
            if ( ! err && Array.isArray( res.body ) ) {
                contacts = res.body.map(function( room ) {
                    return {
                        id: room.id,
                        name: room.name
                    };
                });
            }

            next( err, contacts );
        });
};

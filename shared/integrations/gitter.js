var OAuth2 = require( 'oauth' ).OAuth2,
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
    next( new Error() );
};

/**
 * Given an OAuth token, message, channel, and callback, invokes a network
 * request to Gitter to send the desired message.
 *
 * @param {string}   token   A valid Gitter OAuth2 token
 * @param {object}   message A Gitter attachment object to use for the message
 * @param {string}   channel A Gitter channel ID
 * @param {Function} next    A callback to trigger when the request finishes
 */
module.exports.sendMessage = function( message, channel, token, next ) {
    next( new Error() );
};

/**
 * Given an OAuth token and callback, invokes a network request to Gitter to
 * request the profile information for the user associated with the token.
 *
 * @param {string}   token  A valid Gitter OAuth2 token
 * @param {Function} next   A callback to trigger when the request finishes
 */
module.exports.getMyProfile = function( token, next ) {
    next( new Error() );
};

/**
 * Given an OAuth token and callback, invokes a network request to Gitter to
 * request the available contacts associated with the token.
 *
 * @param {string}   token  A valid Gitter OAuth2 token
 * @param {Function} next   A callback to trigger when the request finishes
 */
module.exports.getContacts = function( token, next ) {
    next( new Error() );
};

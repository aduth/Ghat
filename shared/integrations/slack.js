var request = require( 'superagent' ),
    async = require( 'async' ),
    OAuth2 = require( 'oauth' ).OAuth2,
    flatten = require( 'lodash/array/flatten' ),
    sortBy = require( 'lodash/collection/sortBy' ),
    config = require( '../config' ),
    getUserProfile;

module.exports.oauth = {
    client: new OAuth2(
        config.slack.clientId,
        config.slack.clientSecret,
        'https://slack.com/',
        'oauth/authorize',
        'api/oauth.access',
        null
    ),
    query: { scope: [ 'identify', 'chat:write:bot', 'channels:read', 'groups:read', 'users:read' ] }
};

module.exports.name = 'Slack';

/**
 * Given an OAuth token and callback, invokes a network request to Slack to
 * verify that the token is still valid.
 *
 * @param {string}   token A Slack OAuth2 token
 * @param {Function} next  A callback to trigger when the request finishes
 */
module.exports.verify = function( token, next ) {
    request.get( 'https://slack.com/api/auth.test' )
        .query({ token: token })
        .end(function( err, res ) {
            var isInvalid = ! err && ( 200 !== res.status || ! res.body.ok );
            next( err || isInvalid );
        });
};

/**
 * Given an OAuth token, message, channel, and callback, invokes a network
 * request to Slack to send the desired message.
 *
 * @param {string}   token   A valid Slack OAuth2 token
 * @param {object}   message A Slack attachment object to use for the message
 * @param {string}   channel A Slack channel ID
 * @param {Function} next    A callback to trigger when the request finishes
 */
module.exports.sendMessage = function( message, channel, token, next ) {
    request.get( 'https://slack.com/api/chat.postMessage' )
        .query({
            channel: channel,
            attachments: JSON.stringify([ message ]),
            username: config.chat.username,
            token: token,
            icon_url: config.chat.avatar
        })
        .end(function( err, res ) {
            next( err, res );
        });
};

/**
 * Given an OAuth token, user ID, and callback, invokes a network request to
 * Slack to request the profile information for the specified user.
 *
 * @param {string}   token  A valid Slack OAuth2 token
 * @param {string}   userId A Slack user ID
 * @param {Function} next   A callback to trigger when the request finishes
 */
getUserProfile = module.exports.getUserProfile = function( userId, token, next ) {
    request.get( 'https://slack.com/api/users.info' )
        .query({ token: token, user: userId })
        .end(function( err, res ) {
            err = err || res.error;

            var profile;
            if ( ! err && res.body.ok ) {
                profile = {
                    username: res.body.user.name,
                    avatar: res.body.user.profile.image_192
                };
            }

            next( err, profile );
        });
};

/**
 * Given an OAuth token and callback, invokes a network request to Slack to
 * request the profile information for the user associated with the token.
 *
 * @param {string}   token  A valid Slack OAuth2 token
 * @param {Function} next   A callback to trigger when the request finishes
 */
module.exports.getMyProfile = function( token, next ) {
    request.get( 'https://slack.com/api/auth.test' )
        .query({ token: token })
        .end(function( err, res ) {
            err = err || res.error;

            if ( err ) {
                return next( err );
            }

            getUserProfile( res.body.user_id, token, next );
        });
};

/**
 * Given an OAuth token and callback, invokes a network request to Slack to
 * request the available contacts associated with the token.
 *
 * @param {string}   token  A valid Slack OAuth2 token
 * @param {Function} next   A callback to trigger when the request finishes
 */
module.exports.getContacts = function( token, next ) {
    var requestList = function( resource, property, type, asyncNext ) {
        request.get( 'https://slack.com/api/' + resource + '.list' )
            .query({ token: token })
            .end(function( err, res ) {
                var contacts;
                if ( ! err && res.body.ok ) {
                    contacts = res.body[ property ].map(function( member ) {
                        var prefix = 'user' === type ? '@' : '#';

                        return {
                            id: member.id,
                            name: prefix + member.name,
                            type: type
                        };
                    });
                }

                asyncNext( err, contacts );
            });
    };

    async.parallel([
        requestList.bind( null, 'users', 'members', 'user' ),
        requestList.bind( null, 'channels', 'channels', 'channel' ),
        requestList.bind( null, 'groups', 'groups', 'channel' )
    ], function( err, contacts ) {
        next( err, sortBy( flatten( contacts ), 'name' ) );
    });
};

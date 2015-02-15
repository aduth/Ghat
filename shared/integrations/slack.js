var request = require( 'superagent' ),
    async = require( 'async' ),
    OAuth2 = require( 'oauth' ).OAuth2,
    flatten = require( 'lodash/array/flatten' ),
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
    query: { scope: [ 'post' ] }
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
    async.parallel([
        function( asyncNext ) {
            request.get( 'https://slack.com/api/users.list' )
                .query({ token: token })
                .end(function( err, res ) {
                    var contacts;
                    if ( ! err && res.body.ok ) {
                        contacts = res.body.members.map(function( member ) {
                            return {
                                id: member.id,
                                name: '@' + member.name,
                                type: 'user'
                            };
                        });
                    }

                    asyncNext( err, contacts );
                });
        },
        function( asyncNext ) {
            request.get( 'https://slack.com/api/channels.list' )
                .query({ token: token })
                .end(function( err, res ) {
                    var contacts;
                    if ( ! err && res.body.ok ) {
                        contacts = res.body.channels.map(function( channel ) {
                            return {
                                id: channel.id,
                                name: '#' + channel.name,
                                type: 'channel'
                            };
                        });
                    }

                    asyncNext( err, contacts );
                });
        }
    ], function( err, contacts ) {
        next( err, flatten( contacts ) );
    });
};

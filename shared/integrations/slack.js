var request = require( 'superagent' ),
    async = require( 'async' ),
    OAuth2 = require( 'oauth' ).OAuth2,
    flatten = require( 'lodash-node/modern/arrays/flatten' ),
    config = require( '../../config' ),
    getUserAvatar;

module.exports.oauth = {
    client: new OAuth2(
        config.slack.clientId,
        config.slack.clientSecret,
        'https://slack.com/',
        'oauth/authorize',
        'api/oauth.access',
        null
    ),
    scope: [ 'post' ]
};

module.exports.sendMessage = function( message, channel, token, next ) {
    var text = message.text;
    if ( message.url ) {
        text += ' ' + message.url;
    }

    request.get( 'https://slack.com/api/chat.postMessage' )
        .query({
            channel: channel,
            text: text,
            username: config.chat.username,
            token: token
        })
        .end(function( err, res ) {
            next( err, res );
        });
};

getUserAvatar = module.exports.getUserAvatar = function( userId, token, next ) {
    request.get( 'https://slack.com/api/users.info' )
        .query({ token: token, user: userId })
        .end(function( err, res ) {
            err = err || res.error;

            var avatar;
            if ( ! err && res.body.ok ) {
                avatar = res.body.user.profile.image_192;
            }

            next( err, avatar );
        });
};

module.exports.getMyAvatar = function( token, next ) {
    request.get( 'https://slack.com/api/auth.test' )
        .query({ token: token })
        .end(function( err, res ) {
            err = err || res.error;

            if ( err ) {
                return next( err );
            }

            getUserAvatar( res.body.user_id, token, next );
        });
};

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

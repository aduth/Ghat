var request = require( 'superagent' ),
    OAuth2 = require( 'oauth' ).OAuth2,
    config = require( '../../config' );

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
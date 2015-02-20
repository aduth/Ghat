var format = require( 'util' ).format,
    helpers = require( '../../helpers/' ),
    constants = require( '../../../shared/constants/' );

module.exports = function( body ) {
    if ( ! body.commits.length ) {
        return;
    }

    return {
        fallback: format( '[%s] %d new commit%s by %s', body.repository.full_name, body.commits.length, body.commits.length > 1 ? 's' : '', body.pusher.name ),
        pretext: format( '[%s] %d new commit%s by %s:', body.repository.full_name, body.commits.length, body.commits.length > 1 ? 's' : '', body.pusher.name ),
        text: body.commits.map(function( commit ) {
            return format( '<%s|%s>: %s', commit.url, helpers.formatting.shortCommitSha( commit.id ), commit.message );
        }).join( '\n' ),
        color: constants.app.COLOR_SECONDARY
    };
};

var format = require( 'util' ).format;

module.exports = function( body ) {
    if ( ! body.commits.length ) {
        return;
    }

    return format( '[%s] %d new commit%s by %s', body.repository.full_name, body.commits.length, body.commits.length > 1 ? 's' : '', body.pusher.name );
};

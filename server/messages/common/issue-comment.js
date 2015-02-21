var format = require( 'util' ).format;

module.exports = function( body ) {
    return format( '[%s] New comment on issue #%d: %s', body.repository.full_name, body.issue.number, body.issue.title );
};

var format = require( 'util' ).format;

module.exports = function( body ) {
    return format( '[%s] Issue %s by %s - #%d: %s', body.repository.full_name, body.action, body.sender.login, body.issue.number, body.issue.title );
};

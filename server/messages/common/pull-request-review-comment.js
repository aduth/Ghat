var format = require( 'util' ).format;

module.exports = function( body ) {
    return format( '[%s] Pull request commented on by %s - #%d: %s', body.repository.full_name, body.sender.login, body.pull_request.number, body.pull_request.title );
};

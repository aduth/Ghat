var format = require( 'util' ).format;

module.exports = function( body ) {
    return format( '[%s] Pull request %s by %s - #%d: %s', body.repository.full_name, body.action, body.sender.login, body.pull_request.number, body.pull_request.title );
};

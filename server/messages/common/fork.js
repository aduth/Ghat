var format = require( 'util' ).format;

module.exports = function( body ) {
    return format( '[%s] Repository forked by %s - %s', body.repository.full_name, body.sender.login, body.forkee.full_name );
};

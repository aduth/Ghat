var format = require( 'util' ).format;

module.exports = function( body ) {
    return format( '[%s] Repository watched by %s', body.repository.full_name, body.sender.login );
};

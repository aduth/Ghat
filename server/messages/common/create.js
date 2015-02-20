var format = require( 'util' ).format,
    helpers = require( '../../helpers/' );

module.exports = function( body ) {
    return format( '[%s] %s "%s" created by %s', body.repository.full_name, helpers.formatting.ucfirst( body.ref_type ), body.ref, body.sender.login );
};

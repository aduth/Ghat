var format = require( 'util' ).format,
    helpers = require( '../../helpers/' ),
    constants = require( '../../../shared/constants/' );

module.exports = function( body ) {
    return {
        fallback: format( '[%s] %s "%s" deleted by %s', body.repository.full_name, helpers.formatting.ucfirst( body.ref_type ), body.ref, body.sender.login ),
        pretext: format( '[%s] %s "%s" deleted by %s', body.repository.full_name, helpers.formatting.ucfirst( body.ref_type ), body.ref, body.sender.login ),
        color: constants.app.COLOR_SECONDARY
    };
};

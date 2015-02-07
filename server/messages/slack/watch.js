var format = require( 'util' ).format,
    constants = require( '../../../shared/constants/' );

module.exports = function( body ) {
    return {
        fallback: format( '[%s] Repository watched by %s', body.repository.full_name, body.sender.login ),
        pretext: format( '[%s] Repository watched by %s', body.repository.full_name, body.sender.login ),
        color: constants.app.COLOR_SECONDARY
    };
};

var format = require( 'util' ).format,
    config = require( '../../config' ),
    errors = require( '../errors/' ),
    helpers = require( '../helpers/' ),
    buildResponse;

buildResponse = function( data ) {
    return format(
        '<!DOCTYPE html><title></title><script>window.opener.postMessage(\'%s\', \'%s\'); window.close();</script>',
        JSON.stringify( data || {} ),
        config.origin
    );
};

module.exports.success = function( req, res, next ) {
    res.send( buildResponse( res.data ) );
};

module.exports.failure = function( err, req, res, next ) {
    if ( ! ( err instanceof errors.Base ) ) {
        helpers.log.error( 'An unknown error occurred: %s (%s:%d)', err.message, err.fileName, err.lineNumber );
        err = new errors.Base();
    }

    res.status( err.code ).send( buildResponse({
        error: {
            code: err.code,
            type: err.name,
            message: err.message
        }
    }) );
};

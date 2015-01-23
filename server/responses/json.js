var errors = require( '../errors/' ),
    helpers = require( '../helpers/' );

module.exports.success = function( req, res, next ) {
    res.send( res.data );
};

module.exports.failure = function( err, req, res, next ) {
    if ( ! ( err instanceof errors.Base ) ) {
        helpers.log.error( 'An unknown error occurred: %s', err.message );
        helpers.log.error( err.stack );
        err = new errors.Base();
    }

    res.status( err.code ).send({
        error: {
            code: err.code,
            type: err.name,
            message: err.message
        }
    });
};

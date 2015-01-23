var errors = require( '../errors' ),
    helpers = require( '../helpers/' );

module.exports.success = function( req, res, next ) {
    res.sendStatus( 200 );
};

module.exports.failure = function( err, req, res, next ) {
    if ( ! ( err instanceof errors.Base ) ) {
        helpers.log.error( 'An unknown error occurred: %s', err.message );
        helpers.log.error( err.stack );
        err = new errors.Base();
    }

    res.sendStatus( err.code );
};

var errors = require( '../errors' );

module.exports.success = function( req, res, next ) {
    res.sendStatus( 200 );
};

module.exports.failure = function( err, req, res, next ) {
    if ( ! ( err instanceof errors.Base ) ) {
        err = new errors.Base();
    }

    res.sendStatus( err.code );
};
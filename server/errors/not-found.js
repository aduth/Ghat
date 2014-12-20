var BaseError = require( './base' );

var NotFoundError = module.exports = function( message ) {
    if ( ! message ) {
        message = 'The specified resource could not be found';
    }

    BaseError.call( this, message );
};

NotFoundError.prototype = Object.create( BaseError.prototype );

NotFoundError.prototype.code = 404;

NotFoundError.prototype.name = 'not_found';
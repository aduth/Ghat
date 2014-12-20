var BaseError = require( './base' );

var UnauthorizedError = module.exports = function( message ) {
    if ( ! message ) {
        message = 'The request did not contain the required authorization parameters';
    }

    BaseError.call( this, message );
};

UnauthorizedError.prototype = Object.create( BaseError.prototype );

UnauthorizedError.prototype.code = 401;

UnauthorizedError.prototype.name = 'unauthorized';
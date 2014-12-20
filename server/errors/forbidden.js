var BaseError = require( './base' );

var ForbiddenError = module.exports = function( message ) {
    if ( ! message ) {
        message = 'The request was understood but the server denies access';
    }

    BaseError.call( this, message );
};

ForbiddenError.prototype = Object.create( BaseError.prototype );

ForbiddenError.prototype.code = 403;

ForbiddenError.prototype.name = 'forbidden';
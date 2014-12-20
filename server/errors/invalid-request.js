var BaseError = require( './base' );

var InvalidRequestError = module.exports = function( message ) {
    if ( ! message ) {
        message = 'The request was malformed and could not be interpreted';
    }

    BaseError.call( this, message );
};

InvalidRequestError.prototype = Object.create( BaseError.prototype );

InvalidRequestError.prototype.code = 400;

InvalidRequestError.prototype.name = 'invalid_request';
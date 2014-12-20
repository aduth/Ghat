var BaseError = require( './base' );

var UnknownProviderError = module.exports = function( message ) {
    if ( ! message ) {
        message = 'The specified provider is not a known provider';
    }

    BaseError.call( this, message );
};

UnknownProviderError.prototype = Object.create( BaseError.prototype );

UnknownProviderError.prototype.code = 400;

UnknownProviderError.prototype.name = 'unknown_provider';
var BaseError = require( './base' );

var NotImplementedError = module.exports = function( message ) {
    if ( ! message ) {
        message = 'The request could not be processed because necessary support has not yet been implemented';
    }

    BaseError.call( this, message );
};

NotImplementedError.prototype = Object.create( BaseError.prototype );

NotImplementedError.prototype.code = 501;

NotImplementedError.prototype.name = 'not_implemented';
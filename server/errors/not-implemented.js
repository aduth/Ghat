var BaseError = require( './base' );

var NotImplementedError = module.exports = function( message ) {
    if ( ! message ) {
        message = 'The request could not be processed because necessary support has not yet been implemented';
    }

    BaseError.call( this, message );
};

NotImplementedError.prototype = Object.create( BaseError.prototype );

// The 501 status would be more appropriate, but we want to avoid the response
// being interpreted as a server error. Instead, we send a non-commital 202
NotImplementedError.prototype.code = 202;

NotImplementedError.prototype.name = 'not_implemented';

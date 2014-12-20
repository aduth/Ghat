var BaseError = module.exports = function( message ) {
    Error.call( this, message );
    this.message = message;
}

BaseError.prototype = Object.create( Error.prototype );

BaseError.prototype.code = 500;

BaseError.prototype.name = 'unknown_error';
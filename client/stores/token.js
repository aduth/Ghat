var EventEmitter = require( 'events' ).EventEmitter,
    TokenStore;

TokenStore = module.exports = function() {
    this.tokens = {};
};

TokenStore.prototype = Object.create( EventEmitter.prototype );

TokenStore.prototype.get = function( tokenName ) {
    return this.tokens[ tokenName ];
};

TokenStore.prototype.set = function( tokenName, value ) {
    this.tokens[ tokenName ] = value;
    this.emit( 'change' );
};
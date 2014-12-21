var EventEmitter = require( 'events' ).EventEmitter,
    TokenStore, _store;

TokenStore = module.exports = function() {
    this.tokens = {};
};

TokenStore.getInstance = function() {
    if ( ! _store ) {
        _store = new TokenStore();
    }

    return _store;
};

TokenStore.prototype = Object.create( EventEmitter.prototype );

TokenStore.prototype.get = function( tokenName ) {
    return this.tokens[ tokenName ];
};

TokenStore.prototype.set = function( tokenName, value ) {
    this.tokens[ tokenName ] = value;
    this.emit( 'change' );
};
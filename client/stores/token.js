var EventEmitter = require( 'events' ).EventEmitter,
    intersection = require( 'lodash-node/modern/arrays/intersection' ),
    helpers = require( '../../shared/helpers/' ),
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

TokenStore.prototype.isConnectedToGitHub = function() {
    return !! this.get( 'github' );
};

TokenStore.prototype.isConnectedToChat = function() {
    return intersection(
        Object.keys( this.tokens ),
        helpers.integrations.getChatIntegrations()
    ).length > 0;
};

TokenStore.prototype.isConnected = function() {
    return this.isConnectedToGitHub() && this.isConnectedToChat();
};

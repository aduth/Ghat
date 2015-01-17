var intersection = require( 'lodash-node/modern/arrays/intersection' ),
    LocalStore = require( './local' ),
    helpers = require( '../../shared/helpers/' ),
    TokenStore;

TokenStore = module.exports = function() {
    LocalStore.call( this, 'tokens' );
};

TokenStore.prototype = Object.create( LocalStore.prototype );

TokenStore.prototype.isConnectedToGitHub = function() {
    return !! this.get( 'github' );
};

TokenStore.prototype.isConnectedToChat = function() {
    return !! this.getConnectedChatToken();
};

TokenStore.prototype.isConnected = function() {
    return this.isConnectedToGitHub() && this.isConnectedToChat();
};

TokenStore.prototype.getConnectedChatToken = function() {
    var connections = this.getAll(),
        chatTokens;

    if ( connections ) {
        chatTokens = intersection(
            Object.keys( connections ),
            helpers.integrations.getChatIntegrations()
        );

        if ( chatTokens.length ) {
            return chatTokens[0];
        }
    }
};

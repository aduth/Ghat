var intersection = require( 'lodash/array/intersection' ),
    LocalStore = require( './local' ),
    helpers = require( '../../shared/helpers/' ),
    integrations = require( '../../shared/integrations/' ),
    TokenStore;

TokenStore = module.exports = function() {
    LocalStore.call( this, 'tokens' );
    this.verified = {};
    this.isVerifying = {};
};

TokenStore.prototype = Object.create( LocalStore.prototype );

TokenStore.prototype.get = function( key ) {
    var token = LocalStore.prototype.get.call( this, key );

    if ( this.verified[ key ] ) {
        return token;
    } else if ( token && ! this.isVerifying[ key ] && key in integrations ) {
        this.isVerifying[ key ] = true;

        integrations[ key ].verify( token, function( err ) {
            if ( err ) {
                this.remove( key );
            } else {
                this.verified[ key ] = true;
                this.emit( 'change' );
                this.emit( 'verify' );
            }

            this.isVerifying[ key ] = false;
        }.bind( this ) );
    }
};

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

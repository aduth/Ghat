var intersection = require( 'lodash/array/intersection' ),
    LocalStorageStore = require( './local-storage' ),
    helpers = require( '../../shared/helpers/' ),
    integrations = require( '../../shared/integrations/' ),
    TokenStore;

/**
 * The store constructor, which invokes the inherited store's constructor.
 */
TokenStore = module.exports = function() {
    LocalStorageStore.call( this, 'tokens' );
    this.verified = {};
    this.isVerifying = {};
};

TokenStore.prototype = Object.create( LocalStorageStore.prototype );

/**
 * Retrieves a token by the specified provider. If the token hasn't yet been
 * verified, an undefined value is returned and the token is verified to be
 * valid. Once verification is complete, a `verify` event is emitted. If the
 * token is invalid, it is removed from the store.
 *
 * @param  {mixed}  provider The provider for the token to be retrieved
 * @return {string}          A verified token, or undefined if verification
 *                           is pending
 */
TokenStore.prototype.get = function( provider ) {
    var token = LocalStorageStore.prototype.get.call( this, provider );

    if ( this.verified[ provider ] ) {
        return token;
    } else if ( token && ! this.isVerifying[ provider ] && provider in integrations ) {
        this.isVerifying[ provider ] = true;

        integrations[ provider ].verify( token, function( err ) {
            if ( err ) {
                this.remove( provider );
            } else {
                this.verified[ provider ] = true;
                this.emit( 'change' );
                this.emit( 'verify' );
            }

            this.isVerifying[ provider ] = false;
        }.bind( this ) );
    }
};

/**
 * Saves a token to the store using the specified provider. Emits a `change`
 * event. Automatically assumes that the token is valid and thus future
 * retrievals will be returned without verification.
 *
 * @param {mixed} provider The key to be used for later retrieval
 * @param {mixed} token    A token value to save to the store
 */
TokenStore.prototype.set = function( provider, token ) {
    LocalStorageStore.prototype.set.call( this, provider, token );
    this.verified[ provider ] = true;
};

/**
 * Returns true if the store contains a valid token for GitHub, or false
 * otherwise.
 *
 * @return {Boolean} True if the store contains a valid GitHub token
 */
TokenStore.prototype.isConnectedToGitHub = function() {
    return !! this.get( 'github' );
};

/**
 * Returns true if the store contains a valid token for any chat provider, or
 * false otherwise.
 *
 * @return {Boolean} True if the store contains a valid chat provider token
 */
TokenStore.prototype.isConnectedToChat = function() {
    return !! this.getConnectedChatToken();
};

/**
 * Returns the first available token for any chat provider.
 *
 * @return {string} The first available token for any chat provider
 */
TokenStore.prototype.getConnectedChatToken = function() {
    var connections = this.getAll();

    if ( connections ) {
        return intersection(
            Object.keys( connections ),
            helpers.integrations.getChatIntegrations()
        )[0];
    }
};

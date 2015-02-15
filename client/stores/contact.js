var ArrayStore = require( './array' ),
    integrations = require( '../../shared/integrations/' ),
    ContactStore;

/**
 * The store constructor, which invokes the inherited store's constructor.
 */
ContactStore = module.exports = function() {
    this.fetching = false;
};

ContactStore.prototype = Object.create( ArrayStore.prototype );

/**
 * Returns the available contacts associated with the specified chat provider
 * and token. If the contacts have not yet been fetched, a network request will
 * be invoked and an empty array returned.
 *
 * @param  {string} provider A chat provider name
 * @param  {string} token    A valid chat provider OAuth2 token
 * @return {Array}           An array of available contacts
 */
ContactStore.prototype.get = function( provider, token ) {
    if ( this.token !== token ) {
        this.fetch( provider, token );
        return [];
    }

    return ArrayStore.prototype.get.call( this );
};

/**
 * Given a chat provider name and OAuth token, invokes a network request to
 * the chat provider to request the available contacts associated with the
 * token. When the request is complete, the contacts are saved to the store and
 * a `change` event is emitted.
 *
 * @param {string} provider A chat provider name
 * @param {string} token    A valid chat provider OAuth2 token
 */
ContactStore.prototype.fetch = function( provider, token ) {
    if ( this.fetching[ provider ] || ! token || ! ( provider in integrations ) ||
            'function' !== typeof integrations[ provider ].getContacts ) {
        return;
    }

    this.token = token;
    this.fetching = true;

    integrations[ provider ].getContacts( token, function( err, contacts ) {
        if ( ! err ) {
            this.set( contacts );
        }

        this.fetching = false;
    }.bind( this ) );
};

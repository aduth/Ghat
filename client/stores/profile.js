var ObjectStore = require( './object' ),
    integrations = require( '../../shared/integrations/' ),
    ProfileStore;

/**
 * The store constructor, which invokes the inherited store's constructor.
 */
ProfileStore = module.exports = function() {
    ObjectStore.call( this );
    this.fetching = {};
};

ProfileStore.prototype = Object.create( ObjectStore.prototype );

/**
 * Returns the profile associated with the specified provider and token. If the
 * profile has not yet been fetched, a network request will be invoked and an
 * undefined value returned.
 *
 * @param  {string} provider A provider name
 * @param  {string} token    A valid provider OAuth2 token
 * @return {Object}          A profile object
 */
ProfileStore.prototype.get = function( provider, token ) {
    var profile = ObjectStore.prototype.get.call( this, provider );

    if ( ! profile ) {
        this.fetch( provider, token );
    }

    return profile;
};

/**
 * Given a provider name and OAuth token, invokes a network request to request
 * the profile associated with the provider and token. When the request is
 * complete, the profile saved to the store and a `change` event is emitted.
 *
 * @param {string} provider A provider name
 * @param {string} token    A valid OAuth2 token
 */
ProfileStore.prototype.fetch = function( provider, token ) {
    if ( this.fetching[ provider ] || ! token || ! ( provider in integrations ) ||
            'function' !== typeof integrations[ provider ].getMyProfile ) {
        return;
    }

    this.fetching[ provider ] = true;

    integrations[ provider ].getMyProfile( token, function( err, profile ) {
        if ( ! err ) {
            this.set( provider, profile );
        }

        this.fetching[ provider ] = false;
    }.bind( this ) );
};

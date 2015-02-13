var request = require( 'superagent' ),
    findIndex = require( 'lodash/array/findIndex' ),
    ArrayStore = require( './array' ),
    config = require( '../../config' ),
    IntegrationStore;

/**
 * The store constructor, which invokes the inherited store's constructor.
 */
IntegrationStore = module.exports = function( initial ) {
    ArrayStore.call( this, initial );
};

IntegrationStore.prototype = Object.create( ArrayStore.prototype );

/**
 * Returns the integrations associated with the specified provider and token.
 * If the integrations have not yet been fetched, a network request will be
 * invoked and an empty array returned.
 *
 * @param  {string} provider A provider name
 * @param  {string} token    A valid provider OAuth2 token
 * @return {Array}           A set of integrations
 */
IntegrationStore.prototype.get = function( chatProvider, chatToken ) {
    if ( this.chatToken !== chatToken ) {
        this.fetch( chatProvider, chatToken );
        return [];
    }

    return this.store;
};

/**
 * Given a provider name and OAuth token, invokes a network request to request
 * the user's integrations configured. When the request is complete, the
 * integrations are saved to the store and a `change` event is emitted.
 *
 * @param {string} provider A provider name
 * @param {string} token    A valid OAuth2 token
 */
IntegrationStore.prototype.fetch = function( chatProvider, chatToken ) {
    if ( this.fetching || ! chatToken ) {
        return;
    }
    this.fetching = true;
    this.chatToken = chatToken;

    request.get( config.origin + '/integration' )
        .query({
            'chat.provider': chatProvider,
            'chat.token': chatToken
        })
        .end(function( err, res ) {
            if ( ! err && res.ok ) {
                this.store = res.body;
                this.emit( 'change' );
            }
        }.bind( this ) );
};

/**
 * Given an integration object, invokes a network request to the Ghat app to
 * save the desired integration. When the request is complete, the integration
 * is saved to the store and a `change` event is emitted.
 *
 * @param {string}   integration An object describing the desired integration
 * @param {Function} next        A callback to trigger when the request finishes
 */
IntegrationStore.prototype.create = function( integration, next ) {
    request.post( config.origin + '/integration' )
        .send( integration )
        .end(function( err, res ) {
            if ( ! err && res.ok ) {
                this.add( res.body );
            }

            if ( next ) {
                next( err, (res || {}).body );
            }
        }.bind( this ) );

    return integration;
};

/**
 * Removes an integration given an ID, chat provider, and chat token. Removes
 * the integration immediately, restoring it if the request fails. In both
 * cases, a `change` event is emitted.
 *
 * @param {string}   id           The ID of the integration to remove
 * @param {string}   chatProvider The integration's chat provider
 * @param {string}   chatToken    A valid OAuth2 token for the chat provider
 * @param {Function} next         A callback to trigger when the request finishes
 */
IntegrationStore.prototype.removeById = function( id, chatProvider, chatToken, next ) {
    var index = findIndex( this.store, { _id: id }),
        integration = this.store[ index ];

    // Abandon early if the integration doesn't exist in the store
    if ( -1 === index ) {
        return;
    }

    this.remove( index );

    request.del( config.origin + '/integration/' + id )
        .query({
            'chat.provider': chatProvider,
            'chat.token': chatToken
        })
        .end(function( err, res ) { /* jshint ignore:line */
            if ( err ) {
                this.store.splice( index, 0, integration );
                this.trigger( 'change' );
            }

            if ( next ) {
                next( err );
            }
        });
};

var request = require( 'superagent' ),
    find = require( 'lodash/collection/find' ),
    findIndex = require( 'lodash/array/findIndex' ),
    ArrayStore = require( './array' ),
    config = require( '../../shared/config' ),
    shortId = require( 'shortid' ),
    crypto = require( 'crypto' ),
    IntegrationStore;

/**
 * The store constructor, which invokes the inherited store's constructor.
 */
IntegrationStore = module.exports = function( initial ) {
    ArrayStore.call( this, initial );
};

IntegrationStore.prototype = Object.create( ArrayStore.prototype );

/**
 * Returns the integration with the specified ID.
 *
 * @param  {string} id An integration ID
 * @return {Object}    The integration with the specified ID
 */
IntegrationStore.prototype.getById = function( id ) {
    return find( this.store, { _id: id });
};

/**
 * Returns the integrations associated with the specified provider and token.
 * If the integrations have not yet been fetched, a network request will be
 * invoked and an empty array returned.
 *
 * @param  {string} provider    A provider name
 * @param  {string} chatToken   A valid chat provider OAuth2 token
 * @param  {string} githubToken A valid GitHub OAuth2 token
 * @return {Array}              A set of integrations
 */
IntegrationStore.prototype.get = function( chatProvider, chatToken, githubToken ) {
    if ( this.chatToken !== chatToken || this.githubToken !== githubToken ) {
        this.fetch( chatProvider, chatToken, githubToken );
        return [];
    }

    return this.store;
};

/**
 * Given a provider name and OAuth token, invokes a network request to request
 * the user's integrations configured. When the request is complete, the
 * integrations are saved to the store and a `change` event is emitted.
 *
 * @param  {string} provider    A provider name
 * @param  {string} chatToken   A valid chat provider OAuth2 token
 * @param  {string} githubToken A valid GitHub OAuth2 token
 */
IntegrationStore.prototype.fetch = function( chatProvider, chatToken, githubToken ) {
    if ( this.fetching || ! chatToken || ! githubToken ) {
        return;
    }
    this.fetching = true;
    this.chatToken = chatToken;
    this.githubToken = githubToken;

    request.get( config.origin + '/api/integration' )
        .query({
            'chat.provider': chatProvider,
            'chat.token': chatToken,
            'github.token': githubToken
        })
        .end(function( err, res ) {
            if ( ! err && res.ok ) {
                this.store = res.body;
                this.emit( 'change' );
            }
        }.bind( this ) );
};

/**
 * Generates a new integration with auto-generated ID and secret values, to be
 * extended with other integration properties before stored using `create`.
 *
 * @return {Object} A new integration object
 */
IntegrationStore.prototype.generate = function() {
    return {
        _id: shortId.generate(),
        secret: crypto.randomBytes( config.security.secretLength ).toString( 'hex' )
    };
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
    this.add( integration );

    request.post( config.origin + '/api/integration' )
        .send( integration )
        .end(function( err, res ) {
            if ( err || ! res.ok ) {
                this.store.pop();
            }

            if ( next ) {
                next( err, integration );
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
 * @param {string}   githubToken  A valid GitHub OAuth2 token
 * @param {Function} next         A callback to trigger when the request finishes
 */
IntegrationStore.prototype.removeById = function( id, chatProvider, chatToken, githubToken, next ) {
    var index = findIndex( this.store, { _id: id }),
        integration = this.store[ index ];

    // Abandon early if the integration doesn't exist in the store
    if ( -1 === index ) {
        return;
    }

    this.remove( index );

    request.del( config.origin + '/api/integration/' + id )
        .query({
            'chat.provider': chatProvider,
            'chat.token': chatToken,
            'github.token': githubToken
        })
        .end(function( err, res ) { /* jshint ignore:line */
            if ( err ) {
                this.store.splice( index, 0, integration );
                this.emit( 'change' );
            }

            if ( next ) {
                next( err );
            }
        }.bind( this ) );
};

var ArrayStore = require( './array' ),
    findIndex = require( 'lodash/array/findIndex' ),
    integrations = require( '../../shared/integrations/' ),
    HookStore;

/**
 * The store constructor, which invokes the inherited store's constructor.
 */
HookStore = module.exports = function( initial ) {
    ArrayStore.call( this, initial );
};

HookStore.prototype = Object.create( ArrayStore.prototype );

/**
 * Given an OAuth token and webhook details, invokes a network request to
 * GitHub to create the desired webhook at the repository. When the request is
 * complete, the webhook is saved to the store and a `change` event is emitted.
 *
 * @param {string}   token       A valid GitHub OAuth2 token
 * @param {Object}   integration An integration object from which to base the
 *                               GitHub webhook
 * @param {Function} next        A callback to trigger when the request finishes
 */
HookStore.prototype.create = function( token, integration, next ) {
    integrations.github.createWebhook( token, integration, function( err, result ) {
        this.add( result );

        if ( next ) {
            next( err, result );
        }
    }.bind( this ) );
};

/**
 * Given an OAuth token and webhook details, invokes a network request to
 * GitHub to update the desired webhook at the repository. When the request is
 * complete, the webhook is saved to the store and a `change` event is emitted.
 *
 * @param {string}   token       A valid GitHub OAuth2 token
 * @param {Object}   integration An integration object from which to base the
 *                               GitHub webhook
 * @param {Function} next        A callback to trigger when the request finishes
 */
HookStore.prototype.update = function( token, integration, next ) {
    var index = findIndex( this.store, { id: integration.github.hookId });

    integrations.github.updateWebhook( token, integration, function( err, result ) {
        if ( ! err ) {
            if ( index >= 0 ) {
                this.set( integration, index );
            } else {
                this.add( integration );
            }
        }

        if ( next ) {
            next( err, result );
        }
    }.bind( this ) );
};

/**
 * Given an OAuth token and webhook details, invokes a network request to
 * GitHub to remove the specified webhook at the repository. When the request
 * is complete, the webhook is removed the store and a `change` event emitted.
 *
 * @param {string}   token       A valid GitHub OAuth2 token
 * @param {Object}   integration An integration object from which to derive the
 *                               GitHub webhook to remove
 * @param {Function} next        A callback to trigger when the request finishes
 */
HookStore.prototype.remove = function( token, integration, next ) {
    var index = findIndex( this.store, { id: integration.github.hookId });
    if ( -1 === index ) {
        return;
    }

    ArrayStore.prototype.remove.call( this, index );

    integrations.github.removeWebhook( token, integration, function( err ) {
        if ( err ) {
            this.add( integration, index );
        }

        if ( next ) {
            next( err );
        }
    }.bind( this ) );
};

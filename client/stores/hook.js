var ArrayStore = require( './array' ),
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
 * @param {string}   token      A valid GitHub OAuth2 token
 * @param {string}   repository A GitHub repository full name
 * @param {Array}    events     An array of event names for which the webhook
 *                              will be invoked
 * @param {Function} next       A callback to trigger when the request finishes
 */
HookStore.prototype.create = function( token, repository, events, integration, next ) {
    integrations.github.createWebhook( token, repository, events, integration, function( err, result ) {
        this.add( result );

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
 * @param {string}   token      A valid GitHub OAuth2 token
 * @param {number}   hookId     A GitHub repository hook ID
 * @param {string}   repository A GitHub repository full name
 * @param {Function} next       A callback to trigger when the request finishes
 */
HookStore.prototype.removeById = function( token, hookId, repository, next ) {
    integrations.github.removeWebhook( token, hookId, repository, function( err ) {
        this.findAndRemove({ id: hookId });

        if ( next ) {
            next( err );
        }
    }.bind( this ) );
};

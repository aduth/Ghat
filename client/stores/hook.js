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
 * @param {string} token      A valid GitHub OAuth2 token
 * @param {string} repository A GitHub repository full name
 * @param {Array}  event      An array of event names for which the webhook
 *                            will be invoked
 */
HookStore.prototype.create = function( token, repository, event, integration ) {
    integrations.github.createWebhook( token, repository, event, integration, function( err, result ) {
        this.add( result );
    }.bind( this ) );
};
